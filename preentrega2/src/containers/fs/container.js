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

	async getById(number) {
		this.#items = JSON.parse(await promises.readFile(this.#route, "utf-8"))
		return this.#items.find(item => item.id === number) ?? null
	}

	async getAll() {
		this.#items = JSON.parse(await promises.readFile(this.#route, "utf-8"))
		return this.#items
	}

	async replaceById(item) {
		this.#items = JSON.parse(await promises.readFile(this.#route, "utf-8"))
		const index = this.#items.findIndex(i => i.id === item.id)
		if (index === -1) throw new Error(`${this.itemsName} not found`)
		this.#items[index] = item
		await promises.writeFile(this.#route, JSON.stringify(this.#items))
	}

	async deleteById(number) {
		this.#items = JSON.parse(await promises.readFile(this.#route, "utf-8"))
		const itemToDelete = await this.#items.find(item => item.id === number)
		const indexToDelete = this.#items.indexOf(itemToDelete)
		if (indexToDelete !== -1) {
			this.#items.splice(indexToDelete, 1)
		}
		await promises.writeFile(this.#route, JSON.stringify(this.#items))
	}

	async deleteAll() {
		this.#items = JSON.parse(await promises.readFile(this.#route, "utf-8"))
		this.#items.splice(0)
		await promises.writeFile(this.#route, JSON.stringify(this.#items))
	}
}

export default FSContainer
