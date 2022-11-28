import express from "express"
import {
	controllerGetProducts,
	controllerGetProductById,
	controllerPostProduct,
	controllerPutProductById,
	controllerDeleteProductById,
} from "../controllers/controllerProducts.js"

const routerProducts = express.Router()

routerProducts.get("/", controllerGetProducts)
routerProducts.get("/:id", controllerGetProductById)
routerProducts.post("/", controllerPostProduct)
routerProducts.put("/:id", controllerPutProductById)
routerProducts.delete("/:id", controllerDeleteProductById)

export default routerProducts
