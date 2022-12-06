import express from "express"
import routerApiMessages from "../routers/routerApiMessages.js"
import routerApiProducts from "../routers/routerApiProducts.js"

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", routerApiProducts)
app.use("/api/messages", routerApiMessages)
