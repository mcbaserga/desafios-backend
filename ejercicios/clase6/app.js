import express from 'express'

const products = [
	{
		"id": 1,
		"title": "Adidas Galaxy",
		"description": "Zapatillas deportivas",
		"price": 60000,
		"thumbnail": "https://craftypixels.com/placeholder-image/300",
		"code": 1050,
		"stock": 10
	},
	{
		"id": 2,
		"title": "Adidas Adizero",
		"description": "Zapatillas deportivas",
		"price": 30000,
		"thumbnail": "https://craftypixels.com/placeholder-image/300",
		"code": 1010,
		"stock": 4
	},
	{
		"id": 3,
		"title": "Adidas Runfalcon",
		"description": "Zapatillas deportivas",
		"price": 40000,
		"thumbnail": "https://craftypixels.com/placeholder-image/300",
		"code": 1020,
		"stock": 3
	},
	{
		"id": 4,
		"title": "Adidas Predator",
		"description": "Zapatillas deportivas",
		"price": 20000,
		"thumbnail": "https://craftypixels.com/placeholder-image/300",
		"code": 1030,
		"stock": 6
	},
	{
		"id": 5,
		"title": "Adidas Forum",
		"description": "Zapatillas deportivas",
		"price": 50000,
		"thumbnail": "https://craftypixels.com/placeholder-image/300",
		"code": 1040,
		"stock": 10
	}
]


const app = express()

app.get('/', (request, response) => {
    response.send('Solicitud recibida')
})

app.get('/products', (request, response) => {
    response.send({products})
})

app.get('/products/:id', (request, response) => {
    const id = request.params.id
    const product = product.find(item => item.id == id)
    if (!product) return response.send({ error: 'El producto no existe' })
    response.send(product)
})

app.get('/users', (request, response) => {
    const id = request.query.id
    if (!id) {
        response.send({users})
    } else {
        const user = users.find(item => item.id == id)
        if (!user) return response.send({ error: 'El user no existe' })
        response.send(user)
    }
})
