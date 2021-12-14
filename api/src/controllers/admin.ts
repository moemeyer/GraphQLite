import { serverErrors } from "app";
import { createGQLAdminDB, getGQLAdminDB } from "db/schema/GQLAdmin";
import express from "express";
import fs from "fs";
import { JWT_EXPIRES } from "lib/config";
import path from "path";
import { hashPassword, verifyPassword } from "utils/hash";
import { createToken } from "utils/jwt";
import {
  createRefreshToken,
  deleteRefreshToken,
  verifyRefreshToken,
} from "utils/refresh-token";
import { v4 as uuidv4 } from "uuid";

export const logout = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { uid } = res.locals;
    const { refreshToken } = req.body;

    await deleteRefreshToken(uid, refreshToken);

    res.locals.data = {
      success: true,
    };
    return next("router");
  } catch (err) {
    return next(err);
  }
};

export const refresh = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    const id = await verifyRefreshToken(refreshToken);

    if (id === "superadmin") {
      const token = createToken({
        sub: id,
        admin: true,
        user: {
          uid: id,
          email: process.env.ADMIN_EMAIL,
        },
      });

      res.locals.data = {
        uid: id,
        idToken: token,
        refreshToken,
        expires: parseInt(JWT_EXPIRES),
      };
      return next("router");
    }

    const user = await getGQLAdminDB({ where: { objectId: id } });

    const token = createToken({
      sub: id,
      admin: true,
      user: {
        uid: id,
        email: user.email,
      },
    });

    res.locals.data = {
      uid: id,
      idToken: token,
      refreshToken,
      expires: parseInt(JWT_EXPIRES),
    };
    return next("router");
  } catch (err) {
    return next(err);
  }
};

export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email, password } = req.body;

    const id = uuidv4();
    await createGQLAdminDB({
      objectId: id,
      email,
      passwordHash: hashPassword(password),
    });

    const token = createToken({
      sub: id,
      admin: true,
      user: {
        uid: id,
        email,
      },
    });

    const refreshToken = await createRefreshToken(id);

    res.locals.data = {
      uid: id,
      idToken: token,
      refreshToken,
      expires: parseInt(JWT_EXPIRES),
    };
    return next("router");
  } catch (err: any) {
    if (err.message === "Validation error")
      err.message =
        "This email address is already associated with an existing user.";
    return next(err);
  }
};

export const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const id = "superadmin";
      const token = createToken({
        sub: id,
        admin: true,
        user: {
          uid: id,
          email: process.env.ADMIN_EMAIL,
        },
      });
      const refreshToken = await createRefreshToken(id);

      res.locals.data = {
        uid: id,
        idToken: token,
        refreshToken,
        expires: parseInt(JWT_EXPIRES),
      };
      return next("router");
    }

    const user = await getGQLAdminDB({ where: { email } });
    const id = user.objectId;

    if (!verifyPassword(password, user.passwordHash))
      throw new Error("Your password is invalid.");

    const token = createToken({
      sub: id,
      admin: true,
      user: {
        uid: id,
        email: user.email,
      },
    });
    const refreshToken = await createRefreshToken(id);

    res.locals.data = {
      uid: id,
      idToken: token,
      refreshToken,
      expires: parseInt(JWT_EXPIRES),
    };
    return next("router");
  } catch (err: any) {
    if (err.message === "Cannot read property 'dataValues' of null")
      err.message = "The email is not associated with an existing user.";
    return next(err);
  }
};

export const getSecretKey = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    res.locals.data = {
      key: process.env.SECRET_KEY,
    };
    return next("router");
  } catch (err: any) {
    return next(err);
  }
};

export const getConfigFiles = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let resolvers = "";
    const resolversPath = path.resolve(__dirname, "../../config/resolvers.js");
    if (fs.existsSync(resolversPath))
      resolvers = fs.readFileSync(resolversPath).toString();

    let schemaSQL = "";
    const schemaSQLPath = path.resolve(__dirname, "../../config/schema.sql");
    if (fs.existsSync(schemaSQLPath))
      schemaSQL = fs.readFileSync(schemaSQLPath).toString();

    let schemaGraphQL = "";
    const schemaGraphQLPath = path.resolve(
      __dirname,
      "../../config/schema.graphql"
    );
    if (fs.existsSync(schemaGraphQLPath))
      schemaGraphQL = fs.readFileSync(schemaGraphQLPath).toString();

    res.locals.data = {
      resolvers,
      schemaSQL,
      schemaGraphQL,
    };
    return next("router");
  } catch (err: any) {
    return next(err);
  }
};

export const getSchemaStatus = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    res.locals.data = {
      errors: serverErrors.length ? serverErrors : null,
    };
    return next("router");
  } catch (err: any) {
    return next(err);
  }
};

export const editConfigFiles = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { resolvers, schemaGraphQL, schemaSQL } = req.body;

    // Get config files path
    const resolversPath = path.resolve(__dirname, "../../config/resolvers.js");
    const schemaGraphQLPath = path.resolve(
      __dirname,
      "../../config/schema.graphql"
    );
    const schemaSQLPath = path.resolve(__dirname, "../../config/schema.sql");

    if (resolvers) {
      fs.writeFileSync(resolversPath, resolvers);
    }

    if (schemaGraphQL) {
      fs.writeFileSync(schemaGraphQLPath, schemaGraphQL);
    }

    if (schemaSQL) {
      fs.writeFileSync(schemaSQLPath, schemaSQL);
    }

    res.locals.data = {
      success: true,
    };
    return next("router");
  } catch (err: any) {
    return next(err);
  }
};
