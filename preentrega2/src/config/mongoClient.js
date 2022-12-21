import { MongoClient } from "mongodb"

const CNX_STR = "mongodb://localhost:27017"
const DB_NAME = "coderhouse"

const mongoClient = new MongoClient(CNX_STR)

// try {
// 	await mongoClient.connect()
// } catch (error) {
// 	throw error
// }

export const mongoDBClient = mongoClient.db(DB_NAME)
