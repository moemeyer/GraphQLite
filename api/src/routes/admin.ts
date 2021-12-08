import { makeExecutableSchema } from "@graphql-tools/schema";
import * as admin from "controllers/admin";
import * as storage from "controllers/storage";
import { createDateResolver, createDateSchema } from "db/schema/Date";
import {
  createGQLAdminResolver,
  createGQLAdminSchema,
} from "db/schema/GQLAdmin";
import { createGQLUserResolver, createGQLUserSchema } from "db/schema/GQLUser";
import { Router } from "express";
import { graphqlHTTP } from "express-graphql";
import { merge } from "lodash";
import authMiddleware from "middlewares/auth";
import onlyAdmin from "middlewares/onlyAdmin";

const gqlUserSchema = createGQLUserSchema();
const gqlUserResolver = createGQLUserResolver();

const gqlAdminSchema = createGQLAdminSchema();
const gqlAdminResolver = createGQLAdminResolver();

const dateSchema = createDateSchema();
const dateResolver = createDateResolver();

/* Resolvers */
const resolvers = merge(gqlUserResolver, gqlAdminResolver, dateResolver);

/* Schemas */
const typeDefs = [gqlUserSchema, gqlAdminSchema, dateSchema];

const schema = makeExecutableSchema({ typeDefs, resolvers });

const router = Router();

/* Admin Auth endpoints */
router.post("/auth/users", admin.create);
router.post("/auth/login", admin.login);
router.post("/auth/logout", authMiddleware, onlyAdmin, admin.logout);
router.post("/auth/refresh", admin.refresh);

/* Admin Storage endpoints */
router.post("/storage/b", authMiddleware, onlyAdmin, storage.createBucket);
router.get("/storage/b", authMiddleware, onlyAdmin, storage.listBuckets);
router.get(
  "/storage/b/:name/o",
  authMiddleware,
  onlyAdmin,
  storage.listObjects
);

router.use(
  "/graphql",
  authMiddleware,
  onlyAdmin,
  graphqlHTTP({
    schema,
    graphiql: false,
  })
);

export default router;
