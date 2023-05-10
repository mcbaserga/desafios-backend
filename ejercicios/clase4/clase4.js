import fs from 'fs'

const user = {
    username: 'hola',
    age: 40,
    email: 'mimail@mail.com'
}

await fs.promises.writeFile('./users.json', JSON.stringify(user, null, '\t'))

let contenido = JSON.parse(await fs.promises.readFile('./users.js', 'utf-8'))

contenido.age = 35
await fs.promises.writeFile('./users.json', JSON.stringify(contenido, null, '\t'))