export default class MysqlContainer {
	#client
	#table

	constructor(mysqlClient, table) {
		this.#client = mysqlClient
		this.#table = table
	}

	async save(item) {
		try {
			await this.#client(this.#table).insert(item)
		} catch (error) {
			throw new Error(error)
		}
	}

	async getAll() {
		try {
			return this.#client(this.#table).select()
		} catch (error) {
			throw new Error(error)
		}
	}

	async getById(id) {
		try {
			// const array = await this.getAll()
			// return array.find(item => item.id === id) ?? null
			return this.#client(this.#table).select().where("id", id)
		} catch (error) {
			throw new Error(error)
		}
	}

	async updateById(id, item) {
		try {
			await this.#client(this.#table).update(item).where("id", id)
		} catch (error) {
			throw new Error(error)
		}
	}

	async deleteAll() {
		try {
			await this.#client(this.#table).delete()
		} catch (err) {
			throw new Error(err)
		}
	}

	async deleteById(id) {
		try {
			await this.#client(this.#table).delete().where("id", id)
		} catch (error) {
			throw new Error(error)
		}
	}
}
