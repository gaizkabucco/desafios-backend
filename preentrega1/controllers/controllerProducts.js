import { randomUUID } from "crypto"
import Container from "../src/container.js"

const route = "./src/products.txt"
const products = new Container(route)
let isAdmin = true

export async function controllerGetProducts(req, res) {
	let result = await products.getAll()
	res.json(result)
}

export async function controllerPostProduct(req, res) {
	if (!isAdmin) {
		res.status(401)
		res.json({ error: -1, descripcion: "ruta /api/products metodo POST no autorizado" })
	} else {
		const newProduct = req.body
		newProduct.id = randomUUID()
		await products.save(newProduct)
		res.status(201)
		res.json(newProduct)
	}
}

export async function controllerGetProductById({ params: { id } }, res) {
	const productToFind = await products.getById(id)
	if (!productToFind) {
		res.status(404)
		res.json({ error: `no se encontró producto con ese id (${id})` })
	} else {
		res.json(productToFind)
	}
}

export async function controllerPutProductById({ body, params: { id } }, res) {
	if (!isAdmin) {
		res.status(401)
		res.json({ error: -1, descripcion: "ruta /api/products/:id metodo PUT no autorizado" })
	} else {
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
}

export async function controllerDeleteProductById({ params: { id } }, res) {
	if (!isAdmin) {
		res.status(401)
		res.json({ error: -1, descripcion: "ruta /api/products/:id metodo DELETE no autorizado" })
	} else {
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
}

export { products }
