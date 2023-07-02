import express from 'express'
import handlebars from 'express-handlebars'
import userRouter from './routers/user.router.js'
import mongoose from 'mongoose'
import pokemonRouter from './routers/pokemon.router.js'
import viewsRouter from './routers/views.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {res.send('Working great')})
app.use('/users', userRouter)
app.use('/api/pokemon', pokemonRouter)
app.use('/pokemons', viewsRouter)

mongoose.set('strictQuery', false)
try {
    await mongoose.connect('mongodb+srv://mcbaserga:Italia2021@cluster0.kyocnos.mongodb.net/complementario1')
    app.listen(8080,() => console.log('Server up'))
} catch (err) {
    console.log(err.message)
}



// try {
//     await mongoose.connect('mongodb+srv://mcbaserga:Italia2021@cluster0.kyocnos.mongodb.net/complementario1')
//     app.listen(8080, () => console.log( 'Server up' ))
// } catch (err) {
//     console.log(err.message)
// }
