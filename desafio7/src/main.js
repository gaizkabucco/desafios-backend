import { app } from "./server.js"
import { PORT } from "./config.js"

app.listen(PORT, () => {
	try {
		console.log(`Server connected on port ${PORT}`)
	} catch (error) {
		throw new Error("Error connecting server" + error)
	}
})
