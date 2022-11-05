const fs = require("fs")

class ContenedorArchivo {
	#productos
	#ruta

	constructor(ruta) {
		this.#productos = []
		this.#ruta = ruta
	}

	async save(product) {
		this.#productos.push(product)
		await fs.promises.writeFile(this.#ruta, JSON.stringify(this.#productos))
	}

	async getById(number) {
		this.#productos = JSON.parse(await fs.promises.readFile(this.#ruta, "utf-8"))
		return this.#productos.find(product => product.id === number) ?? null
	}

	async getAll() {
		this.#productos = JSON.parse(await fs.promises.readFile(this.#ruta, "utf-8"))
		return this.#productos
	}

	async deleteById(number) {
		this.#productos = JSON.parse(await fs.promises.readFile(this.#ruta, "utf-8"))
		const productToDelete = await this.#productos.find(product => product.id === number)
		const indexToDelete = await this.#productos.indexOf(productToDelete)
		if (indexToDelete !== -1) {
			this.#productos.splice(indexToDelete, 1)
		}
		await fs.promises.writeFile(this.#ruta, JSON.stringify(this.#productos))
	}

	async deleteAll() {
		this.#productos = JSON.parse(await fs.promises.readFile(this.#ruta, "utf-8"))
		await this.#productos.splice(0)
		await fs.promises.writeFile(this.#ruta, JSON.stringify(this.#productos))
	}
}

module.exports = { ContenedorArchivo }
