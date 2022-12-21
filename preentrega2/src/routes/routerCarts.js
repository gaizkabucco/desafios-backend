import express from "express"
import { deleteAllCartProducts, deleteProductFromCart, getCartProducts, postCart, postCartProduct } from "../controllers/controllerCarts.js"

const routerCarts = express.Router()

routerCarts.post("/", postCart)
routerCarts.post("/:id_cart", postCartProduct)
routerCarts.get("/:id_cart", getCartProducts)
routerCarts.delete("/:id_cart", deleteAllCartProducts)
routerCarts.delete("/:id_cart/:id_prod", deleteProductFromCart)

export default routerCarts
