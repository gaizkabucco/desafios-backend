const express = require("express")
const { routerApi } = require("./routers/routerApi.js")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/views", express.static("views"))

app.use("/api/products", routerApi)

async function main() {
	function connect(port = 0) {
		return new Promise((resolve, reject) => {
			const conectedServer = app.listen(port, () => {
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
