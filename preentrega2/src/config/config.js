import MemoryContainer from "../containers/memory/container.js"
import { existsSync, promises } from "fs"
import FSContainer from "../containers/fs/container.js"
import MongoDBContainer from "../containers/mongoDB/container.js"
import FirestoreContainer from "../containers/firestore/container.js"

export const port = process.env.PORT || 8080

// Rutas para persistencia en archivos
export const PRODUCTS_ROUTE = "./src/storagefiles/products.txt"
export const CARTS_ROUTE = "./src/storagefiles/carts.txt"

// Seleccion de persistencia---------------------------------------

export const PERSISTENCE = "mongodb"
// export const PERSISTENCE = "firestore"
// export const PERSISTENCE = "fs"
// export const PERSISTENCE = "memory"

export let cartsContainer
export let productsContainer

switch (PERSISTENCE) {
	case "mongodb":
		productsContainer = new MongoDBContainer("product")
		cartsContainer = new MongoDBContainer("cart")
		break
	case "firestore":
		productsContainer = new FirestoreContainer("product")
		cartsContainer = new FirestoreContainer("cart")
		break
	case "fs":
		if (!existsSync(PRODUCTS_ROUTE)) await promises.writeFile(PRODUCTS_ROUTE, "[]")
		if (!existsSync(CARTS_ROUTE)) await promises.writeFile(CARTS_ROUTE, "[]")
		productsContainer = new FSContainer(PRODUCTS_ROUTE)
		cartsContainer = new FSContainer(CARTS_ROUTE)
		break
	default:
		productsContainer = new MemoryContainer("product")
		cartsContainer = new MemoryContainer("cart")
}
