import { Router } from "express";
import ProductManager from '../managers/ProductManager.js'

const product = new ProductManager()


const productRouter = Router()

productRouter.get('/', async(req,res) => {
    res.send(await product.getProducts())
})

// router.get('/', (req, res) => {
//     const limit = req.query.limit
//     if (limit > manager.products.length) {
//         return res.status(400).json({ error: 'Invalid limit'})
//     }
//     res.status(200).json({ manager: manager.products.slice(0, limit) })
// })

productRouter.get('/:pid', async(req,res) => {
    const pid = parseInt(req.params.pid)
    res.send(await product.getProductsById(pid))
})


productRouter.post('/', async(req,res) =>{
    const newProduct = req.body
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