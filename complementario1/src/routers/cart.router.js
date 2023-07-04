import { Router } from 'express'
import cartModel from '../dao/models/cart.model.js'

const router = Router()

router.get('/', async (req, res) => {
    const result = await cartModel.find()
    res.status(200).json( {status: 'success', payload: result })
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

router.get('/:cid', async (req, res) => {
    try{
        const id = req.params.cid
        const result = await cartModel.findById(id).lean().exec()
        if (result === null) {
            return res.status(404).json({ message:'Cart not found'})
        }
        res.status(200).json({ status: 'success', payload: result })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
})


router.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const productId = req.body.productId;

    try {
        const cart = await cartModel.findById(cid);

        if (!cart) {
            return res.status(404).json({ status: 'error', error: 'Cart not found' });
        }

        cart.products.push({ product: productId });

        await cart.save();

        res.status(200).json({ status: 'success', payload: cart });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});



export default router


