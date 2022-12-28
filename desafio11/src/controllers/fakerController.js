import { fakerProducts } from "../containers/ContainerFaker.js"

export async function getFakerProducts(req, res) {
	const array = await fakerProducts.getAll()
	res.status(200)
	res.json(array)
}
