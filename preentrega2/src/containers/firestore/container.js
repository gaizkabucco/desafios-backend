import { firestoreDatabase } from "../../config/firestoreClient.js"

function asObject(doc) {
	return { id: doc.id, ...doc.data() }
}

class FirestoreContainer {
	#collection
	constructor(collectionName) {
		this.#collection = firestoreDatabase.collection(collectionName)
	}

	async save(item) {
		try {
			delete item.id
			const ref = await this.#collection.add(item)
			return { ...item, id: ref.id }
		} catch (err) {
			console.log(err)
			throw new Error("Error saving item in firebase" + err)
		}
	}

	async getAll() {
		const result = []
		try {
			const snapshot = await this.#collection.get()
			snapshot.forEach(doc => {
				result.push(asObject(doc))
			})
		} catch (err) {
			console.log(err)
			throw new Error("Error getting data from firebase" + err)
		}
		return result
	}

	async getById(number) {
		let searchObject
		try {
			let snapshot = await this.#collection.doc(number).get()
			searchObject = asObject(snapshot)
		} catch (err) {
			console.log(err)
			throw new Error("Error getting data from firebase" + err)
		}
		return searchObject
	}

	async replaceById(item) {
		let ref = {}
		try {
			ref = await this.#collection.doc(item.id).update(item)
		} catch (err) {
			console.log(err)
			throw new Error("Error updating data from firebase" + err)
		}
	}

	async deleteById(number) {
		try {
			await this.#collection.doc(number).delete()
		} catch (err) {
			console.log(err)
			throw new Error("Error deleting data from firebase" + err)
		}
	}

	async deleteAll() {
		try {
			const snapshot = await this.#collection.get()
			snapshot.forEach(doc => {
				this.#collection.doc(doc.id).delete()
			})
		} catch (err) {
			console.log(err)
			throw new Error("Error deleting data from firebase" + err)
		}
	}
}

export default FirestoreContainer
