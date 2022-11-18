const FileContainer = require("../containers/container.js")

const route = "./src/products.txt"

const products = new FileContainer(route)

async function controllerGetProducts() {
	let storedProducts = await products.getAll()
	result = storedProducts ? storedProducts : []
	return result
}

async function controllerPostProduct(product) {
	const newProduct = await product
	await products.save(newProduct)
}

exports.controllerGetProducts = controllerGetProducts
exports.controllerPostProduct = controllerPostProduct
