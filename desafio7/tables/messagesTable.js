import { mysqlConfig } from "../src/config.js"
import createKnex from "knex"

const mysqlClient = createKnex(mysqlConfig)

export async function createTable(tableName) {
	try {
		const table = await mysqlClient.schema.hasTable(tableName)
		if (!table) {
			await mysqlClient.schema.createTable(tableName, table => {
				table.string("id", 255).primary()
				table.string("message_time", 255)
				table.string("message_sender", 255)
				table.string("message_body", 255)
			})
		}
	} catch (error) {
		throw new Error(error)
	} finally {
		mysqlClient.destroy()
	}
}
