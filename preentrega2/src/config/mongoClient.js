import { MongoClient } from "mongodb"

const CNX_STR = "mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false&directConnection=true"
const DB_NAME = "coderhouse"

const mongoClient = new MongoClient(CNX_STR)

try {
	await mongoClient.connect()
} catch (error) {
	throw error
}

export const mongoDBClient = mongoClient.db(DB_NAME)
