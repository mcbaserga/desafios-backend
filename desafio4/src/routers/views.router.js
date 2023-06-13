import { Router } from 'express'
import ProductManager from '../managers/ProductManager.js'

const router = Router()
const productManager = new ProductManager('./products.json')

router.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    res.render('home', { products })
})

router.get('/realTimerProducts', async(req,res) => {
    const products = await productManager.getProducts()
    res.render('realTimeProducts', { products })
})

export default router