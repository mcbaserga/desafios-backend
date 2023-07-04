import { Router } from 'express'
import messageModel from '../dao/models/message.model.js'

const router = Router()

router.get('/', async (req, res) => {
    const messages = await messageModel.find()
    res.status(200).json( {status: 'success', payload: messages })
})


export default router