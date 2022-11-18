const socket = io.connect()

// Productos----------

function displayProducts(products) {
	return fetch("./templates/products.handlebars")
		.then(res => res.text())
		.then(template => {
			const layout = Handlebars.compile(template)
			const html = layout({ products })
			return html
		})
}

socket.on("updatedProducts", products => {
	displayProducts(products).then(html => {
		document.getElementById("productsList").innerHTML = html
	})
})

const submitProductButton = document.getElementById("submitProductButton")
submitProductButton.addEventListener("click", e => {
	e.preventDefault()
	const nameInput = document.getElementById("nameInput")
	const priceInput = document.getElementById("priceInput")
	const thumbnailInput = document.getElementById("thumbnailInput")
	if (nameInput.value && priceInput.value && thumbnailInput.value) {
		const product = {
			name: nameInput.value,
			price: priceInput.value,
			thumbnail: thumbnailInput.value,
		}
		nameInput.value = ""
		priceInput.value = ""
		thumbnailInput.value = ""
		socket.emit("newProduct", product)
	} else {
		alert("ingrese algun producto")
	}
})

// Mensajes--------

function displayMessages(messages) {
	return fetch("./templates/messages.handlebars")
		.then(res => res.text())
		.then(template => {
			const layout = Handlebars.compile(template)
			const html = layout({ messages })
			return html
		})
}

socket.on("updatedMessages", messages => {
	displayMessages(messages).then(html => {
		document.getElementById("messagesList").innerHTML = html
	})
})

const submitMessageButton = document.getElementById("submitMessageButton")
submitMessageButton.addEventListener("click", e => {
	const authorInput = document.getElementById("authorInput")
	const messageInput = document.getElementById("messageInput")
	if (authorInput.value && messageInput.value) {
		const message = {
			author: authorInput.value,
			text: messageInput.value,
		}
		messageInput.value = ""
		socket.emit("newMessage", message)
	} else {
		alert("ingrese algun mensaje")
	}
})
