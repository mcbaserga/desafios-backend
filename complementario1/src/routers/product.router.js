import { Router } from 'express'
import productModel from '../dao/models/product.model.js'

const router = Router()

router.get('/', async (req, res) => {
    try{
        const limit = req.query.limit || 0
        const result = await productModel.find().limit(limit).lean().exec()
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }

})

router.get('/:pid', async (req,res) => {
    try {
        const id = req.params.pid
        const result = await productModel.findById(id).lean().exec()
        if (result === null) {
            return res.status(404).json({ message:'Product not found'})
        }
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
})


router.post('/', async (req, res) => {
    const productNew = req.body
    const productGenerated = new productModel(productNew)
    try {
        await productGenerated.save()
        res.status(201).json({ status: 'success', payload: productGenerated})
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
})

router.put('/:pid', async (req,res) => {
    try{
        const id = req.params.pid
        const data = req.body
        const result = await productModel.findByIdAndUpdate(id, data, { returnDocument: 'after' })
        if (result === null) {
            return res.status(404).json({ message:'Product not found'})
        }
        const products = await productModel.find().lean().exec()
        req.io.emit('updatedProducts', products)
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const id = req.params.pid
        const result = await productModel.findByIdAndDelete(id)
        if(result === 0){
            return res.status(404).json({ message:'Product not found' })
        } 
        const products = await productModel.find().lean().exec()
        req.io.emit("deletedProduct", products)
        req.status(200).json({ status:'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
})


export default router