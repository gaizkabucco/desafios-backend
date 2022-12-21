import { addProductToCart, createCart, emptyCart, removeProductFromCart, returnCartProducts } from "../models/modelCart.js"

export async function postCart(req, res, next) {
	try {
		await createCart()
		res.sendStatus(201)
	} catch (error) {
		next(error)
	}
}

export async function postCartProduct({ body, params: { id_cart } }, res, next) {
	try {
		const { productId } = body
		const cartId = id_cart
		await addProductToCart(productId, cartId)
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
}

export async function getCartProducts({ params: { id_cart } }, res, next) {
	try {
		res.json(await returnCartProducts(id_cart))
	} catch (error) {
		next(error)
	}
}

export async function deleteAllCartProducts({ params: { id_cart } }, res, next) {
	try {
		await emptyCart(id_cart)
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
}

export async function deleteProductFromCart({ params: { id_cart, id_prod } }, res, next) {
	try {
		await removeProductFromCart(id_prod, id_cart)
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
}
