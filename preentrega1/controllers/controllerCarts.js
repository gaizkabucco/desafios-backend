import { randomUUID } from "crypto"
import Container from "../src/container.js"
import { products } from "./controllerProducts.js"

const route = "./src/carts.txt"
const carts = new Container(route)

export async function controllerPostCart(req, res) {
	const newCart = { products: [] }
	newCart.id = randomUUID()
	await carts.save(newCart)
	res.status(201)
	res.json(newCart)
}

export async function controllerEmptyCart({ params: { id_carrito } }, res) {
	const cartList = await carts.getAll()
	const lookupIndex = cartList.findIndex(p => p.id === id_carrito)
	if (lookupIndex === -1) {
		res.status(404)
		res.json({ error: `no se encontró carrito con ese id (${id_carrito})` })
	} else {
		cartList[lookupIndex] = { products: [], id_carrito }
		await carts.deleteById(id_carrito)
		await carts.save(cartList[lookupIndex])
		res.json(cartList[lookupIndex])
	}
}

export async function controllerPostCartProduct({ body, params: { id_cart } }, res) {
	const cartList = await carts.getAll()
	const lookupIndex = cartList.findIndex(p => p.id === id_cart)
	const productToAdd = await products.getById(body.id)
	if (lookupIndex === -1) {
		res.status(404)
		res.json({ error: `no se encontró carrito con ese id (${id_cart})` })
	} else if (!productToAdd) {
		res.status(404)
		res.json({ error: `no se encontró producto con ese id (${body.id})` })
	} else {
		const updatedCart = cartList[lookupIndex]
		updatedCart.products.push(productToAdd)
		await carts.deleteById(id_cart)
		await carts.save(updatedCart)
		res.json(updatedCart)
	}
}

export async function controllerGetCartProducts({ params: { id_cart } }, res) {
	const cartToFind = await carts.getById(id_cart)
	if (!cartToFind) {
		res.status(404)
		res.json({ error: `no se encontró carrito con ese id (${id_cart})` })
	} else {
		res.json(cartToFind.products)
	}
}

export async function controllerDeleteProductFromCart({ params: { id_cart, id_prod } }, res) {
	const cartList = await carts.getAll()
	const lookupIndex = cartList.findIndex(p => p.id === id_cart)
	const productToRemove = await products.getById(id_prod)
	if (lookupIndex === -1) {
		res.status(404)
		res.json({ error: `no se encontró carrito con ese id (${id_cart})` })
	} else if (!productToRemove) {
		res.status(404)
		res.json({ error: `no se encontró producto con ese id (${id_prod})` })
	} else {
		const indexToDelete = cartList[lookupIndex].products.indexOf(productToRemove)
		cartList[lookupIndex].products.splice(indexToDelete, 1)
		await carts.deleteById(id_cart)
		await carts.save(cartList[lookupIndex])
		res.json(cartList[lookupIndex])
	}
}
