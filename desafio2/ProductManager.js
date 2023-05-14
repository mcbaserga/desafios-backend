import * as fs from 'fs';


class ProductManager {

    static id = 0

    constructor() {
        this.path = "./products.json"
        this.format = 'utf-8'
        this.products = []
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        
        ProductManager.id++
        const newProduct = { id: ProductManager.id, title, description, price, thumbnail, code, stock }
        this.products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
    }

    readProducts = async() => {

        const data = await fs.promises.readFile(this.path, this.format)
        return JSON.parse(data)
    }

    getProducts = async() => {
        
        const products = await this.readProducts()
        return products
    }
    
    getProductById = async(id) => {
        
        const products = await this.readProducts()
        const product = products.find((product) => product.id === id)
            return product || null
    }
    
    updateProduct = async (id, updatedProduct) => {
        const products = await this.readProducts();
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return null; // product not found
        }
        const oldProduct = products[productIndex];
        const newProduct = { ...oldProduct, ...updatedProduct, id };
        const updatedProducts = [...products];
        updatedProducts.splice(productIndex, 1, newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, '\t'));
        return newProduct;
    }

    deleteProductById = async(id) => {
        
        let products = await this.readProducts()
        const deleteById = products.filter(products => products.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(deleteById, null, '\t'))
        return deleteById
    }

}

const manager = new ProductManager()
await manager.addProduct('Adidas Galaxy', 'Zapatillas deportivas', 60000, 'https://craftypixels.com/placeholder-image/300', 1050, 10)
await manager.addProduct('Adidas Adizero', 'Zapatillas deportivas', 30000, 'https://craftypixels.com/placeholder-image/300', 1010, 4)
await manager.addProduct('Adidas Runfalcon', 'Zapatillas deportivas', 40000, 'https://craftypixels.com/placeholder-image/300', 1020, 3)
await manager.addProduct('Adidas Predator', 'Zapatillas deportivas', 20000, 'https://craftypixels.com/placeholder-image/300', 1030, 6)
await manager.addProduct('Adidas Forum', 'Zapatillas deportivas', 50000, 'https://craftypixels.com/placeholder-image/300', 1040, 1)

console.log(await manager.getProducts())

console.log(await manager.getProductById(2))

console.log(await manager.updateProduct(5, {
    "title": "Adidas Forum",
    "description": "Zapatillas deportivas",
    "price": 50000,
    "thumbnail": "https://craftypixels.com/placeholder-image/300",
    "code": 1040,
    "stock": 10
}))

console.log(await manager.deleteProductById(3))