import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import router from './routers/views.router.js'
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'


const app = express()
app.use(express.json())

const server = app.listen(8080, () => console.log('Server up'))
const io = new Server(server)

app.use((req,res,next) => {
    req.io = io
    next()
})

app.use(express.static('./src/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars') 


app.get('/', (req,res) => res.render('index'))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/products', router)


io.on("connection", socket => {
    console.log("New client connected")
    socket.on("productList", data => {
        io.emit("updatedProducts", data)
    })
})



