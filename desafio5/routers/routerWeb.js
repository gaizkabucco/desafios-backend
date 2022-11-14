const express = require("express")
const { controllerGetProducts, controllerPostProduct } = require("../controllers/controllerProductos.js")

const routerWeb = express.Router()

routerWeb.get("/productos", controllerGetProducts)
routerWeb.post("/productos", controllerPostProduct)

exports.routerWeb = routerWeb
