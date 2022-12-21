import express from "express"
import { deleteProductById, deleteProducts, getProductById, getProducts, postProduct, putProduct } from "../controllers/controllerProducts.js"

const routerProducts = express.Router()

routerProducts.get("/", getProducts)
routerProducts.get("/:id_prod", getProductById)
routerProducts.post("/", postProduct)
routerProducts.put("/", putProduct)
routerProducts.delete("/", deleteProducts)
routerProducts.delete("/:id_prod", deleteProductById)

export default routerProducts
