import { Router } from 'express'
import cartModel from '../dao/models/cart.model.js'

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




// import { Router } from 'express'
// import CartManager from '../managers/CartManager.js'


// const cartRouter = Router()

// const carts = new CartManager

// cartRouter.post('/', async(req,res) => {
//     res.send (await carts.addCarts())
// })

// cartRouter.get('/', async(req,res) => {
//     res.send(await carts.readCarts())
// })

// cartRouter.get('/:cid', async(req,res) => {
//     const cid = parseInt(req.params.cid)
//     res.send(await carts.getCartsById(cid))
// })

// cartRouter.post('/:cid/products/:pid', async(req,res) => {
//     const cartId = parseInt(req.params.cid)
//     const productId = parseInt(req.params.pid)
//     res.send(await carts.addProductInCart(cartId, productId))
// })

// export default cartRouter