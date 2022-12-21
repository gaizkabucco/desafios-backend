import express from "express"
import routerProducts from "./routes/routerProducts.js"
import routerCarts from "./routes/routerCarts.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/products", routerProducts)
app.use("/api/cart", routerCarts)

export default app
