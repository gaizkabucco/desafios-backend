import express from "express"
import cors from "cors"
import routerApiTest from "./routers/routerApiTest.js"
export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cors())

app.use("/api/productos-test", routerApiTest)
