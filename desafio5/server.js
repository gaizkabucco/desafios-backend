const express = require("express")
const { routerWeb } = require("./routers/routerWeb.js")
const { engine } = require("express-handlebars")

const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")

app.use("/", routerWeb)
app.use("/productos", routerWeb)

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
