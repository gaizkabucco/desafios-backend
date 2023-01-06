import { promises } from "fs"
import { randomUUID } from "crypto"

class FSContainer {
	#items
	#route

	constructor(route) {
		this.#items = []
		this.#route = route
	}

	async save(item) {
		item.id = randomUUID()
		this.#items.push(item)
		await promises.writeFile(this.#route, JSON.stringify(this.#items))
	}

	async getAll() {
		this.#items = JSON.parse(await promises.readFile(this.#route, "utf-8"))
		return this.#items
	}

	async deleteAll() {
		this.#items = JSON.parse(await promises.readFile(this.#route, "utf-8"))
		this.#items.splice(0)
		await promises.writeFile(this.#route, JSON.stringify(this.#items))
	}
}

export default FSContainer
