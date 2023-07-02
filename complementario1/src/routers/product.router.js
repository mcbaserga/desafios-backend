import { Router } from 'express'
import productModel from '../dao/models/product.model.js'

const router = Router()

router.get('/', async (req, res) => {
    const result = await cartModel.find()
    res.json( {status: 'success', payload: result })
})


router.post('/', async (req, res) => {
    const cartNew = req.body
    const cartGenerated = new cartModel(cartNew)
    try {
        await cartGenerated.save()
        res.status(201).json({ status: 'success', payload: cartGenerated})
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
})

export default router



// import { Router } from "express";
// import ProductManager from '../managers/ProductManager.js'

// const product = new ProductManager()

// const productRouter = Router()


// productRouter.get('/', async (req, res) => {
//     const limit = req.query.limit
//     const products = await product.getProducts()

//     if (limit > products.length) {
//         return res.status(400).json({ error: 'Limit is invalid' })
//     }
//     res.status(200).json({ product: products.slice(0, limit) })
// })

// productRouter.get('/:pid', async(req,res) => {
//     const pid = parseInt(req.params.pid)
//     res.send(await product.getProductsById(pid))
// })


// productRouter.post('/', async(req,res) =>{
//     const newProduct = req.body
//     const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
//     for (const field of requiredFields) {
//         if (!newProduct[field]) {
//             return res.status(400).json({ error: `El campo ${field} es obligatorio.` });
//     }
//     }
//     res.send(await product.addProducts(newProduct))
// })


// productRouter.put('/:pid', async(req,res) => {
//     const pid = parseInt(req.params.pid)
//     const updatedProduct = req.body
//     res.send(await product.updateProduct(pid, updatedProduct))
// })


// productRouter.delete('/:pid', async(req,res) => {
//     const pid = parseInt(req.params.pid)
//     res.send(await product.deleteProductsById(pid))
// })


// export default productRouter