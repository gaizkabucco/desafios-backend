const express = require("express")
const {
	controllerGetProducts,
	controllerGetProductById,
	controllerPostProduct,
	controllerPutProductById,
	controllerDeleteProductById,
} = require("../controllers/controllerProducts.js")

const routerApi = express.Router()

routerApi.get("/", controllerGetProducts)
routerApi.get("/:id", controllerGetProductById)
routerApi.post("/", controllerPostProduct)
routerApi.put("/:id", controllerPutProductById)
routerApi.delete("/:id", controllerDeleteProductById)

exports.routerApi = routerApi
