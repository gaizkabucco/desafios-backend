const express = require("express")

const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")
const { randomUUID } = require("crypto")

const { controllerGetProducts, controllerPostProduct } = require("../controllers/productsController.js")
const { controllerGetMessages, controllerPostMessage } = require("../controllers/messagesController.js")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static("public"))

io.on("connection", async socket => {
	socket.emit("updatedMessages", await controllerGetMessages())
	socket.emit("updatedProducts", await controllerGetProducts())

	socket.on("newMessage", async message => {
		message.date = new Date().toLocaleString()
		await controllerPostMessage(message)
		io.sockets.emit("updatedMessages", await controllerGetMessages())
	})

	socket.on("newProduct", async product => {
		product.id = randomUUID()
		await controllerPostProduct(product)
		io.sockets.emit("updatedProducts", await controllerGetProducts())
	})
})

const server = httpServer.listen(8080, () => {
	console.log(`servidor conectado en puerto ${server.address().port}`)
})
