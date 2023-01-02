import { mongoDBClient } from "../../config/mongoClient.js"

class MongoDBContainer {
	#collection
	constructor(collectionName) {
		this.#collection = mongoDBClient.collection(collectionName)
	}

	async save(item) {
		try {
			await this.#collection.insertOne(item)
		} catch (error) {
			throw new Error("Unable to save item to MongoDB" + error)
		}
	}

	async getAll() {
		try {
			return await this.#collection.find({}).toArray()
		} catch (error) {
			throw new Error("Unable to get items from MongoDB" + error)
		}
	}

	async getById(number) {
		try {
			return await this.#collection.findOne({ id: number })
		} catch (error) {
			throw new Error("Unable to get item from MongoDB" + error)
		}
	}

	async replaceById(item) {
		try {
			await this.#collection.updateOne({ id: item.id }, { $set: item })
		} catch (error) {
			throw new Error("Unable to update item from MongoDB" + error)
		}
	}

	async deleteById(number) {
		try {
			await this.#collection.deleteOne({ id: number })
		} catch (error) {
			throw new Error("Unable to delete item from MongoDB" + error)
		}
	}

	async deleteAll() {
		try {
			await this.#collection.deleteMany({})
		} catch (error) {
			throw new Error("Unable to delete items from MongoDB" + error)
		}
	}
}

export default MongoDBContainer
