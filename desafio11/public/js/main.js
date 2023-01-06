const socketClient = io()

const messagesContainer = document.getElementById("messagesContainer")
const messagesForm = document.getElementById("messagesForm")
const messageMail = document.getElementById("messageMail")
const messageNombre = document.getElementById("messageNombre")
const messageApellido = document.getElementById("messageApellido")
const messageEdad = document.getElementById("messageEdad")
const messageAlias = document.getElementById("messageAlias")
const messageAvatar = document.getElementById("messageAvatar")
const messageTexto = document.getElementById("messageTexto")

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
			headers: { "Content-Type": "application/json charset=UTF-8" },
		})
		data = await request.json()
		showProducts(data)
	} catch (error) {
		console.log(error)
	}
})

messagesForm.onsubmit = e => {
	e.preventDefault()
	const msgObject = {
		author: {
			id: messageMail.value,
			nombre: messageNombre.value,
			apellido: messageApellido.value,
			edad: messageEdad.value,
			alias: messageAlias.value,
			avatar: messageAvatar.value,
		},
		text: messageTexto.value,
		timestamp: new Date().toLocaleString(),
	}

	socketClient.emit("newMessage", msgObject)
	messageTexto.value = ""
}

socketClient.on("loadMessages", messages => {
	loadMessages(messages)
})

function loadMessages(messages) {
	console.log("Cargar mensajes normalizdos:", messages)
}
