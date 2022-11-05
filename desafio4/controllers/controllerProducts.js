const { randomUUID } = require("crypto")
const { ContenedorArchivo } = require("../contenedor.js")

const ruta = "./productos.txt"
const products = new ContenedorArchivo(ruta)

async function controllerGetProducts(req, res) {
	let result = await products.getAll()
	res.json(result)
}

async function controllerPostProduct(req, res) {
	const newProduct = req.body
	newProduct.id = randomUUID()
	await products.save(newProduct)
	res.status(201)
	res.json(newProduct)
}

async function controllerGetProductById({ params: { id } }, res) {
	const productToFind = await products.getById(id)
	if (!productToFind) {
		res.status(404)
		res.json({ error: `no se encontró producto con ese id (${id})` })
	} else {
		res.json(productToFind)
	}
}

async function controllerPutProductById({ body, params: { id } }, res) {
	const productList = await products.getAll()
	const lookupIndex = productList.findIndex(p => p.id === id)
	if (lookupIndex === -1) {
		res.status(404)
		res.json({ error: `no se encontró producto con ese id (${id})` })
	} else {
		productList[lookupIndex] = { ...body, id }
		await products.deleteById(id)
		await products.save(productList[lookupIndex])
		res.json(productList[lookupIndex])
	}
}

async function controllerDeleteProductById({ params: { id } }, res) {
	const productList = await products.getAll()
	const lookupIndex = await productList.findIndex(p => p.id === id)
	if (lookupIndex === -1) {
		res.status(404)
		res.json({ error: `no se encontró producto con ese id (${id})` })
	} else {
		await products.deleteById(id)
		res.json(productList[lookupIndex])
	}
}

exports.controllerGetProducts = controllerGetProducts
exports.controllerPostProduct = controllerPostProduct
exports.controllerGetProductById = controllerGetProductById
exports.controllerPutProductById = controllerPutProductById
exports.controllerDeleteProductById = controllerDeleteProductById
