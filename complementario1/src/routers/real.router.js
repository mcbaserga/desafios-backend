import { Router } from 'express';
import productModel from '../dao/models/product.model.js';

const router = Router();

router.get('/', async (req, res) => {
    const products = await productModel.find().lean().exec();
    res.render('realTimeProducts', { products });
});

export default router;
