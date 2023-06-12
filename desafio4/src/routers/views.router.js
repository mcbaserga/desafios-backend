import { Router } from 'express'
import  ProductManager from '../managers/ProductManager.js'

const viewsRouter = Router()
const productManager = new ProductManager('./products.json')

viewsRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    res.render('home', { products })
})

viewsRouter.get('/realTimerProducts', async(req,res) => {
    const products = await productManager.getProducts()
    res.render('realTimeProducts', { products })
})

export default viewsRouter