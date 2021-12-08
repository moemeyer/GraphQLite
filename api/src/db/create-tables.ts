import Postgres from "db/postgres";
import fs from "fs";
import path from "path";
import SequelizeAuto from "sequelize-auto";
import del from "del";

export default async function createTables() {
  // SYSTEM TABLES
  const systemSchema = fs
    .readFileSync(path.resolve(__dirname, "../../system-schema.sql"))
    .toString();
  const createTableStatements = systemSchema.split(";");
  const systemTables: string[] = [];
  createTableStatements.forEach((statement) => {
    const match = statement.match(/create table "(.*?)"/i);
    if (match) systemTables.push(match[1]);
  });

  // CUSTOM SCHEMA TABLES
  let customTables: string[] = [];
  let createCustomTableStatements: any;
  try {
    const customSchema = fs
      .readFileSync(path.resolve(__dirname, "../../config/schema.sql"))
      .toString();
    createCustomTableStatements = customSchema.split(";");
    createCustomTableStatements.forEach((statement: any) => {
      const match = statement.match(/create table "(.*?)"/i);
      if (match) customTables.push(match[1]);
    });
  } catch (err) {
    console.error("No custom SQL schema.");
  }

  // ALL DATABASE TABLES
  let tables: any = await Postgres.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;",
    { type: "SELECT" }
  );
  tables = tables.map((table: any) => table[0]);

  // CREATE SYSTEM TABLES
  await Promise.all(
    systemTables.map(async (systemTable) => {
      if (!tables.includes(systemTable)) {
        const stat = `${createTableStatements.find((stat) =>
          stat.includes(`create table "${systemTable}"`)
        )};`;
        await Postgres.query(stat);
        console.log(`✅ Table '${systemTable}' created.`);
      } else {
        console.log(`Table '${systemTable}' already created.`);
      }
    })
  );

  // CREATE CUSTOM TABLES
  if (createCustomTableStatements) {
    for (let i = 0; i < customTables.length; i++) {
      const customTable = customTables[i];
      if (!tables.includes(customTable)) {
        const stat = `${createCustomTableStatements.find((stat: any) =>
          stat.includes(`create table "${customTable}"`)
        )};`;
        await Postgres.query(stat);
        console.log(`✅ Table '${customTable}' created.`);
      } else {
        console.log(`Table '${customTable}' already created.`);
      }
    }
  }

  const sequelizeModelFolder = path.resolve(__dirname, "../../models-auto");
  if (fs.existsSync(sequelizeModelFolder)) {
    await del(sequelizeModelFolder);
    console.log("Old models-auto folder deleted.");
  }

  const auto = new SequelizeAuto(
    process.env.DB_DATABASE as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as string,
      dialect: "postgres",
      directory: sequelizeModelFolder,
      logging: false,
    } as any
  );
  await auto.run();
  console.log("✅ Sequelize config files created.");

  const initModels = require(`${sequelizeModelFolder}/init-models.js`);
  initModels(Postgres);
  console.log("✅ Sequelize models initialized.");
}
