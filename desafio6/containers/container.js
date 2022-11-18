const fs = require("fs")

class FileContainer {
	#items
	#route

	constructor(route) {
		this.#items = []
		this.#route = route
	}

	async save(item) {
		this.#items.push(item)
		await fs.promises.writeFile(this.#route, JSON.stringify(this.#items))
	}

	async getById(number) {
		this.#items = JSON.parse(await fs.promises.readFile(this.#route, "utf-8"))
		return this.#items.find(item => item.id === number) ?? null
	}

	async getAll() {
		this.#items = JSON.parse(await fs.promises.readFile(this.#route, "utf-8"))
		return this.#items
	}

	async deleteById(number) {
		this.#items = JSON.parse(await fs.promises.readFile(this.#route, "utf-8"))
		const itemToDelete = await this.#items.find(item => item.id === number)
		const indexToDelete = await this.#items.indexOf(itemToDelete)
		if (indexToDelete !== -1) {
			this.#items.splice(indexToDelete, 1)
		}
		await fs.promises.writeFile(this.#route, JSON.stringify(this.#items))
	}

	async deleteAll() {
		this.#items = JSON.parse(await fs.promises.readFile(this.#route, "utf-8"))
		await this.#items.splice(0)
		await fs.promises.writeFile(this.#route, JSON.stringify(this.#items))
	}
}

module.exports = FileContainer
