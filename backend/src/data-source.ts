import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Address } from "./entities/Address"; // pastikan ini ada

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "chaintrackr",
  synchronize: true,
  logging: false,
  entities: [User, Address], // ✅ pastikan di sini
  migrations: [],
  subscribers: [],
});
