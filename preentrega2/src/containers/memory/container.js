import { randomUUID } from "crypto"

class MemoryContainer {
	#items

	constructor(itemsName) {
		this.#items = []
		this.itemsName = itemsName
	}

	save(item) {
		item.id = randomUUID()
		this.#items.push(item)
	}

	getById(number) {
		return this.#items.find(item => item.id === number) ?? null
	}

	getAll() {
		return this.#items
	}

	replaceById(item) {
		const index = this.#items.findIndex(i => i.id === item.id)
		if (index === -1) throw new Error(`${this.itemsName} not found`)
		this.#items[index] = item
	}

	deleteById(id) {
		const index = this.#items.findIndex(i => i.id === id)
		if (index === -1) throw new Error(`${this.itemsName} not found`)
		this.#items.splice(index, 1)
	}

	deleteAll() {
		this.#items = []
	}
}

export default MemoryContainer
