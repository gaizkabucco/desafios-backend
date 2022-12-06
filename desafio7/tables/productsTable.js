import { mysqlConfig } from "../src/config.js"
import createKnex from "knex"

const mysqlClient = createKnex(mysqlConfig)

export async function createTable(tableName) {
	try {
		const table = await mysqlClient.schema.hasTable(tableName)
		if (!table) {
			await mysqlClient.schema.createTable(tableName, table => {
				table.string("id", 255).primary()
				table.string("product_name", 255)
				table.decimal("product_price")
				table.string("product_description", 255)
				table.string("product_thumbnail", 255)
			})
		}
	} catch (error) {
		throw new Error(error)
	} finally {
		mysqlClient.destroy()
	}
}
