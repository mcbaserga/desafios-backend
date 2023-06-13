const socket = io()

const table = document.getElementById('realProductsTable')


document.getElementById('createBtn').addEventListener('click', () => {
    const body = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
    }
    fetch('/api/products', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(result => result.json())
    .then(result => {
        if (result.status === 'error') throw new Error(result.error)
    })
    .then(() => ('/api/products'))
    .then(result => result.json())
    .then(result => {
        if (result.status === 'error') throw new Error(result.error)
        else socket.emit('productList')
        alert('El producto se ha agregado con éxito')
        document.getElementById('title').value = ''
        document.getElementById('description').value = ''
        document.getElementById('price').value = ''
        document.getElementById('code').value = ''
        document.getElementById('stock').value = ''
        document.getElementById('category').value = ''
    })
    .catch(err => alert('Ocurrió un error'))
})

deleteProduct = (id) => {
    fetch(`/api/products/${id}`, {
        method: 'delete',
    })
    .then(result => result.json())
    .then(result => {
        if(result.status === 'error') throw new Error(result.error)
        else socket.emit('productList')
        alert('Producto eliminado')
    })
    .catch(err => alert('Ocurrió un error'))
}


socket.on('updateProducts', data => {
    table.innerHTML = 
    `<tr>
        <th scope="col">Producto</th>
        <th scope="col">Descripción</th>
        <th scope="col">Precio</th>
        <th scope="col">Código</th>
        <th scope="col">Stock</th>
        <th scope="col">Categoría</th>
    </tr> `
    for(product of data) {
        let tr = document.createElement('tr')
        tr.innerHTML=
        `<tr>
            <td><button class="btn btn-danger" onclick="deleteProduct(${productid})"
            <th scope="col">${product.title}</th>
            <th scope="col">${product.description}</th>
            <th scope="col">${product.price}</th>
            <th scope="col">${product.code}</th>
            <th scope="col">${product.stock}</th>
            <th scope="col">${product.category}</th>
        </tr> `
        table.getElementsByTagName('tbody')[0].appendChild(tr)
    }
})