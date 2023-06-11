import express from 'express'
import productRouter from './src/routers/products.router.js'
import cartRouter from './src/routers/carts.router.js'



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => res.status(200).json({message: 'Server OK'}))


app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)


app.listen(8080, () => console.log('Server up'))