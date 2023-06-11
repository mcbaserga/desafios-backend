import express from "express"
import { Server } from "socket.io"


const app = express()


app.use(express.static("./src/public"))

const log = []

const serverHttp = app.listen(8080, () => console.log("Server up"))
const io = new Server(serverHttp)


io.on("connection", (socket) => {
    console.log("New client connected")
    socket.on('message', data => {
        log.push({id: socket.id, message: data})
        // socket.emit('history', log)
        io.emit('history', log)
    })
})