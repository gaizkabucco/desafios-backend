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

async function test() {
	const ruta = "./productos.txt"
	await fs.promises.writeFile(ruta, "[]")
	const pruebaContenedor = new ContenedorArchivo(ruta)

	await pruebaContenedor.save({ id: 1, title: "prod1", price: 10, thumbnail: "thumbnail1" })
	await pruebaContenedor.save({ id: 2, title: "prod2", price: 20, thumbnail: "thumbnail2" })
	await pruebaContenedor.save({ id: 3, title: "prod3", price: 30, thumbnail: "thumbnail3" })

	console.log(await pruebaContenedor.getById(1))

	console.log(await pruebaContenedor.getAll())

	await pruebaContenedor.deleteById(1)

	console.log(await pruebaContenedor.getAll())

	await pruebaContenedor.deleteAll()

	console.log(await pruebaContenedor.getAll())
}

test()
