import { productsContainer } from "../config/config.js"

let isAdmin = true

export async function getProducts(req, res, next) {
	try {
		let result = await productsContainer.getAll()
		res.json(result)
	} catch (error) {
		next(error)
	}
}

export async function getProductById({ params: { id_prod } }, res, next) {
	try {
		const productToFind = await productsContainer.getById(id_prod)
		if (!productToFind) {
			res.status(404)
			res.json({ error: `no se encontró producto con ese id (${id_prod})` })
		} else {
			res.json(productToFind)
		}
	} catch (error) {
		next(error)
	}
}

export async function postProduct(req, res, next) {
	if (!isAdmin) {
		res.status(401)
		res.json({ error: -1, descripcion: "ruta /api/products metodo POST no autorizado" })
	} else {
		try {
			await productsContainer.save(req.body)
			res.sendStatus(201)
		} catch (error) {
			next(error)
		}
	}
}

export async function putProduct(req, res, next) {
	if (!isAdmin) {
		res.status(401)
		res.json({ error: -1, descripcion: "ruta /api/products metodo PUT no autorizado" })
	} else {
		try {
			productsContainer.replaceById(req.body)
			res.sendStatus(201)
		} catch (error) {
			next(error)
		}
	}
}

export async function deleteProducts(req, res, next) {
	if (!isAdmin) {
		res.status(401)
		res.json({ error: -1, descripcion: "ruta /api/products metodo DELETE no autorizado" })
	} else {
		try {
			productsContainer.deleteAll()
			res.sendStatus(200)
		} catch (error) {
			next(error)
		}
	}
}

export async function deleteProductById({ params: { id_prod } }, res, next) {
	if (!isAdmin) {
		res.status(401)
		res.json({ error: -1, descripcion: "ruta /api/products/:id metodo DELETE no autorizado" })
	} else {
		try {
			productsContainer.deleteById(id_prod)
			res.sendStatus(200)
		} catch (error) {
			next(error)
		}
	}
}
