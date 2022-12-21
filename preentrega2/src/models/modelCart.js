import { randomUUID } from "crypto"
import { cartsContainer, productsContainer } from "../config/config.js"

export async function createCart() {
	const newCart = { products: [] }
	newCart.id = randomUUID()
	cartsContainer.save(newCart)
}

export async function emptyCart(id) {
	const cartToModify = await cartsContainer.getById(id)
	cartToModify.products = []
	cartsContainer.replaceById(cartToModify)
}

export async function addProductToCart(productId, cartId) {
	const cartToModify = await cartsContainer.getById(cartId)
	const productToAdd = await productsContainer.getById(productId)
	cartToModify.products.push(productToAdd)
	cartsContainer.replaceById(cartToModify)
}

export async function returnCartProducts(id) {
	const cartToFind = await cartsContainer.getById(id)
	return cartToFind.products
}

export async function removeProductFromCart(productId, cartId) {
	const cartToModify = await cartsContainer.getById(cartId)
	const items = cartToModify.products.filter(e => e.id !== productId)
	const newCart = { id: cartToModify.id, products: items.slice() }
	cartsContainer.replaceById(newCart)
}
