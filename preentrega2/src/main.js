import { port } from "./config/config.js"
import app from "./server.js"

app.listen(port, () => {
	try {
		console.log(`Conectado a puerto ${port}`)
	} catch (error) {
		console.log(`ha ocurrido un error: ${error}`)
	}
})
