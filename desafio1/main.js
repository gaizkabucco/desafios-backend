class Contenedor {
	#productos

	constructor() {
		this.#productos = []
	}

	save(object) {
		this.#productos.push(object)
	}

	getById(number) {
		return this.#productos.find(product => product.id === number) ?? null
	}

	getAll() {
		return this.#productos
	}

	deleteById(number) {
		const productToDelete = this.#productos.find(product => product.id === number)
		const indexToDelete = this.#productos.indexOf(productToDelete)
		if (indexToDelete !== -1) {
			this.#productos.splice(indexToDelete, 1)
		}
	}

	deleteAll() {
		this.#productos.splice(0)
	}
}

const pruebaContenedor = new Contenedor()

pruebaContenedor.save({ id: 1, title: "prod1", price: 10, thumbnail: "thumbnail1" })
pruebaContenedor.save({ id: 2, title: "prod2", price: 20, thumbnail: "thumbnail2" })
pruebaContenedor.save({ id: 3, title: "prod3", price: 30, thumbnail: "thumbnail3" })
pruebaContenedor.save({ id: 4, title: "prod4", price: 40, thumbnail: "thumbnail4" })

console.log(pruebaContenedor.getById(1))

console.log(pruebaContenedor.getAll())

pruebaContenedor.deleteById(1)

console.log(pruebaContenedor.getAll())

pruebaContenedor.deleteAll()
