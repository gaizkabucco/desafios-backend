const FileContainer = require("../containers/container.js")

const route = "./src/messages.txt"

const messages = new FileContainer(route)

async function controllerGetMessages() {
	let storedMessages = await messages.getAll()
	result = storedMessages ? storedMessages : []
	return result
}

async function controllerPostMessage(message) {
	const newMessage = await message
	await messages.save(newMessage)
}

exports.controllerGetMessages = controllerGetMessages
exports.controllerPostMessage = controllerPostMessage
