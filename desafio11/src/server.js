import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
import routerApiTest from "./routers/routerApiTest.js"
import { normalizeMessages } from "../utils/normalize.js"
import { existsSync, promises } from "fs"
import FSContainer from "./containers/ContainerMessages.js"
export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cors())

app.use("/api/productos-test", routerApiTest)

const httpServer = http.createServer(app)
const socketServer = new Server(httpServer, { cors: { origin: "*" } })

if (!existsSync("../storagefiles")) await promises.writeFile("../storagefiles", "[]")
export const messagesContainer = new FSContainer("../storagefiles")

socketServer.on("connection", client => {
	console.log("Usuario conectado:", client.id)

	messagesContainer.getAll().then(messages => {
		const normalizedMessages = normalizeMessages(messages)
		socketServer.sockets.emit("loadMessages", normalizedMessages)
	})

	client.on("newMessage", data => {
		messagesContainer.save(data)
		messagesContainer.getAll().then(messages => {
			const normalizedMessages = normalizeMessages(messages)
			socketServer.sockets.emit("loadMessages", normalizedMessages)
		})
	})
})
