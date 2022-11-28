import { promises } from "fs"

class Container {
	#items
	#route

	constructor(route) {
		this.#items = []
		this.#route = route
	}

	async save(item) {
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

export default Container
