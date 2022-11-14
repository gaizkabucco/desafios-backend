const { randomUUID } = require("crypto")
const { ContenedorArchivo } = require("../contenedor.js")

const ruta = "./productos.txt"
const products = new ContenedorArchivo(ruta)

async function controllerGetProducts(req, res) {
	let productos = await products.getAll()
	res.render("productos", { productos, hayProductos: productos.length > 0 })
}

async function controllerPostProduct(req, res) {
	const newProduct = req.body
	newProduct.id = randomUUID()
	await products.save(newProduct)
	res.status(201)
	res.redirect("/")
}

exports.controllerGetProducts = controllerGetProducts
exports.controllerPostProduct = controllerPostProduct
