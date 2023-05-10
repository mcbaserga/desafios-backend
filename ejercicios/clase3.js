const products = [
    {
    id: 30,
    name: "Agua Con Gas 1,5 lts",
    stock: 86,
    cost: 45,
    },
    {
    id: 29,
    name: "Agua Sin Gas 1,5 lts",
    stock: 100,
    cost: 140,
    },
    {
    id: 76,
    name: "Alambrado Chardonnay 750 ml",
    stock: 92,
    cost: 575,
    }
]

let is_ok = true;


let getProductos = (products) => {
    return products;
}

let productos = (time, task) => {
    return new Promise((resolve, reject) => {
        if (is_ok) {
            setTimeout(() => {
                resolve(task)
            }, time);
        } else {
            reject("Error")
        }
    });
}

productos(2000, getProductos(products))
    .then(datos => {console.log(datos)})
    .catch(err => console.log(err))