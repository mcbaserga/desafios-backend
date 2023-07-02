import { Router } from "express";
import ProductManager from '../managers/ProductManager.js'

const product = new ProductManager()

const productRouter = Router()


productRouter.get('/', async (req, res) => {
    const limit = req.query.limit
    const products = await product.getProducts()

    if (limit > products.length) {
        return res.status(400).json({ error: 'Limit is invalid' })
    }
    res.status(200).json({ product: products.slice(0, limit) })
})

productRouter.get('/:pid', async(req,res) => {
    const pid = parseInt(req.params.pid)
    res.send(await product.getProductsById(pid))
})


productRouter.post('/', async(req,res) =>{
    const newProduct = req.body
    const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
    for (const field of requiredFields) {
        if (!newProduct[field]) {
            return res.status(400).json({ error: `El campo ${field} es obligatorio.` });
        }}
    res.send(await product.addProducts(newProduct))
})


productRouter.put('/:pid', async(req,res) => {
    const pid = parseInt(req.params.pid)
    const updatedProduct = req.body
    res.send(await product.updateProduct(pid, updatedProduct))
})


productRouter.delete('/:pid', async(req,res) => {
    const pid = parseInt(req.params.pid)
    res.send(await product.deleteProductsById(pid))
})


export default productRouter