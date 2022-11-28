import express from "express"
import {
	controllerDeleteProductFromCart,
	controllerEmptyCart,
	controllerGetCartProducts,
	controllerPostCart,
	controllerPostCartProduct,
} from "../controllers/controllerCarts.js"

const routerCarts = express.Router()

routerCarts.post("/", controllerPostCart)
routerCarts.post("/:id_cart/products", controllerPostCartProduct)
routerCarts.delete("/:id_carrito", controllerEmptyCart)
routerCarts.get("/:id_cart/products", controllerGetCartProducts)
routerCarts.delete("/:id_cart/products/:id_prod", controllerDeleteProductFromCart)

export default routerCarts
