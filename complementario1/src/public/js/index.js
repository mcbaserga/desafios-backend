const socket = io()

const table = document.getElementById('realProductsTable')


document.getElementById('createBtn').addEventListener('click', () => {
    const body = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: Number(document.getElementById('price').value),
        code: Number(document.getElementById('code').value),
        stock: Number(document.getElementById('stock').value),
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
        .then(() => fetch('/api/products'))
        .then(result => result.json())
        .then(result => {
            if (result.status === 'error') throw new Error(result.error)
            else { 
                socket.emit('productList', body)
            }
            alert('El producto se ha agregado con éxito')
            document.getElementById('title').value = ''
            document.getElementById('description').value = ''
            document.getElementById('price').value = ''
            document.getElementById('code').value = ''
            document.getElementById('stock').value = ''
            document.getElementById('category').value = ''
    })
    .catch(err => alert(`Ocurrio un error: (\n${err}`))
})

deleteProduct = (pid) => {
    fetch(`/api/products/${pid}`, {
        method: 'delete',
    })
    .then(result => result.json())
    .then(result => {
        if(result.status === 'error') throw new Error(result.error)
        else socket.emit('productList')
        alert('Producto eliminado')
    })
    .catch(err => alert(`Ocurrio un error: (\n${err}`))
}


socket.on('updateProducts', data => {
    table.innerHTML = 
    `<tr>
        <td></td>
        <td scope="col">Producto</td>
        <td scope="col">Descripción</td>
        <td scope="col">Precio</td>
        <td scope="col">Código</td>
        <td scope="col">Stock</td>
        <td scope="col">Categoría</td>
    </tr> `
    for(product of data) {
        let tr = document.createElement('tr')
        tr.innerHTML=
        `   <td><button class="btn btn-danger" onclick="deleteProduct(${product.pid})"></button></td>
            <td scope="col">${product.title}</td>
            <td scope="col">${product.description}</td>
            <td scope="col">${product.price}</td>
            <td scope="col">${product.code}</td>
            <td scope="col">${product.stock}</td>
            <td scope="col">${product.category}</td>
        `
        table.getElementsByTagName('tbody')[0].appendChild(tr)
    }
})