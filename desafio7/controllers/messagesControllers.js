import { MessagesContainer } from "../containers/messagesContainer.js"
import { randomUUID } from "crypto"
import { createTable } from "../tables/messagesTable.js"
const tableName = "messages"

export async function createMessagesTable(req, res, next) {
	try {
		await createTable(tableName)
		next()
	} catch (error) {
		throw new Error(error)
	}
}

export async function get(req, res) {
	try {
		res.json(await MessagesContainer.getAll())
	} catch (error) {
		throw new Error(error)
	}
}

export async function post({ body }, res) {
	try {
		const message = body
		message.id = randomUUID()
		message.message_time = new Date().toLocaleString()
		await MessagesContainer.save(message)
		res.status(201)
		res.json(message)
	} catch (error) {
		throw new Error(error)
	}
}

export async function getById({ params }, res) {
	try {
		const message = await MessagesContainer.getById(params.id_msg)
		if (!message) {
			res.status(404)
			res.json({ message: "Message not found" })
		} else {
			res.status(201)
			res.json(message)
		}
	} catch (error) {
		throw new Error(error)
	}
}

export async function updateById({ body, params }, res) {
	try {
		await MessagesContainer.updateById(params.id_msg, body)
		res.status(201)
		res.json(body)
	} catch (error) {
		throw new Error(error)
	}
}

export async function deleteAll(req, res) {
	try {
		await MessagesContainer.deleteAll()
		res.status(201)
		res.json(await MessagesContainer.getAll())
	} catch (error) {
		throw new Error(error)
	}
}

export async function deleteById({ params }, res) {
	try {
		await MessagesContainer.deleteById(params.id_msg)
		res.status(201)
		res.json(await MessagesContainer.getAll())
	} catch (error) {
		throw new Error(error)
	}
}
