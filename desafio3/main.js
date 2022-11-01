const fs = require("fs")
const { ContenedorArchivo } = require("./contenedor.js")
const express = require("express")

const server = express()

async function main() {
	const ruta = "./productos.txt"
	await fs.promises.writeFile(ruta, "[]")
	const pruebaContenedor = new ContenedorArchivo(ruta)

	await pruebaContenedor.save({ id: 1, title: "prod1", price: 10, thumbnail: "thumbnail1" })
	await pruebaContenedor.save({ id: 2, title: "prod2", price: 20, thumbnail: "thumbnail2" })
	await pruebaContenedor.save({ id: 3, title: "prod3", price: 30, thumbnail: "thumbnail3" })

	server.get("/productos", async (request, response) => {
		response.json(await pruebaContenedor.getAll())
	})

	server.get("/productoRandom", async (request, response) => {
		const products = await pruebaContenedor.getAll()
		const indexToDisplay = Math.floor(Math.random() * products.length)
		response.json(await products[indexToDisplay])
	})

	function connect(port = 0) {
		return new Promise((resolve, reject) => {
			const conectedServer = server.listen(port, () => {
				resolve(conectedServer)
			})
			conectedServer.on("error", error => reject(error))
		})
	}

	try {
		const serv = await connect(8080)
		console.log(`conectado a puerto ${serv.address().port}`)
	} catch (error) {
		console.log("algo fallo: " + error)
	}
}

main()
