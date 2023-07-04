import express from 'express'
import handlebars from 'express-handlebars'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import viewsRouter from './routers/views.router.js'
import productRouter from './routers/product.router.js'
import cartRouter from './routers/cart.router.js'
import chatRouter from './routers/chat.router.js'
import realRouter from './routers/views.router.js'


const app = express()

const httpServer = app.listen(8080, () => console.log('Server up'))
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use((req,res,next) => {
    req.io = io
    next()
})


app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.static('./src/public'))
app.get('/', (req, res) => {res.send('Working great')})
app.get('/', (req,res) => res.render('index'))

app.use('/products', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/chat', chatRouter)
app.use('/realTimeProducts', realRouter)

const messages = []

mongoose.set('strictQuery', false)
try {
    await mongoose.connect('mongodb+srv://mcbaserga:Italia2021@cluster0.kyocnos.mongodb.net/ecommerce')
} catch (err) {
    console.log(err.message)
}

io.on('connection', socket => {
    console.log('New user connected')
    socket.broadcast.emit('alerta')
    socket.emit('logs', messages)
    socket.on('message', data => {
        messages.push(data)
        io.emit('logs', messages)
    })
})



export default app