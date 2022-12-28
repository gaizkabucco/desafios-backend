const buttonShow = document.getElementById("showProducts")

const showProducts = products => {
	console.log(products)
	const listP = products.map(({ name, price, thumbnail, description }) => {
		return `
              <tr>
                <td id="prodName" class="text-center">${name}</td>
                <td class="text-center">${price}</td>
                <td> <img class="img-thumbnail rounded mx-auto d-block" src="${thumbnail}" alt="${description}"> </td>
                <td> <p>${description}</p> </td>
              </tr>
              `
	})

	const msgList = `
                      <tr>
                          <th class="table-info text-center">Nombre del producto</th>
                          <th class="table-info text-center">Precio del producto</th>
                          <th class="table-info text-center">Imágen del producto</th>
                          <th class="table-info text-center">Descripción del producto</th>
                      </tr>
                        ${listP.join("\n")}
                      `
	const listOfProds = document.getElementById("listOfProds")
	listOfProds.innerHTML = msgList
}

buttonShow.addEventListener("click", async e => {
	e.preventDefault()
	try {
		const request = await fetch("http://localhost:8080/api/productos-test", {
			method: "GET",
			mode: "no-cors",
			headers: { "Content-Type": "application/json charset=UTF-8" },
		})
		console.log(request)
		data = await request.json()
		console.log(data)
		showProducts(data)
	} catch (error) {
		console.log(error)
	}
})
