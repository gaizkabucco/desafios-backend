import express from "express"
import routerProducts from "../routes/routerProducts.js"
import routerCarts from "../routes/routerCarts.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/products", routerProducts)
app.use("/api/shoppingcart", routerCarts)

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
