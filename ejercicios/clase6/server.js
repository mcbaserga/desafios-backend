import http from 'http'

const server = http.createServer((request, response) => {
    console.log('Requested')
    response.end('Solicitud enviada')
})

const connectedServer = server.listen(8080, () => {
    console.log('Servidor conectado en el puerto 8080')
})