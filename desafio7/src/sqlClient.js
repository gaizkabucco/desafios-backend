import { mysqlConfig } from "../src/config.js"
import createKnexClient from "knex"

export const sqlClient = createKnexClient(mysqlConfig)
