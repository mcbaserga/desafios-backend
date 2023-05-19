import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()

const manager = new ProductManager()

const readProducts = manager.readProducts()
console.log(await readProducts)

const allProducts = await readProducts 


app.get('/', async (request, response) => {
    response.send(await readProducts)
})

app.get('/products', async (request, response) => {	
	const limit = parseInt(request.query.limit)
	if(!limit) return response.send(await readProducts)
	const productLimit = allProducts.slice(0, limit)

    response.send(await productLimit)
})

app.get('/products/:id', async (request, response) => {
    const id = parseInt(request.params.id)
		const productId = allProducts.find(product => product.id === id)
	
	response.send(productId)
})

app.listen(8080, () => console.log('Server Up'))