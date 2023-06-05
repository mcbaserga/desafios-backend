import { promises as fs } from 'fs'

class ProductManager {

    static id = 0

    constructor() {
        this.path = './src/models/products.json'
        this.format = 'utf-8'
    }

    readProducts = async() => {
        const products = await fs.readFile(this.path, this.format)
        return JSON.parse(products)
    }

    writeProducts = async(product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    addProducts = async(product) => {
        const oldProducts = await this.readProducts()

        ProductManager.id++
        const newProduct = {id: ProductManager.id, ...product}
        const productAll = [...oldProducts, newProduct]
        await this.writeProducts(productAll)
        return "Product added"

// router.post('/', (req, res) => {
//         const { title, category, description, price, thumbnail, code, stock, status } = req.body
//         if (!title || !description || !price || !code || !stock || !status ) {
//             return res.status(400).json({error: 'All fields are required'})
//         }
//         const productCreated = { id: ProductManager.id + 1, title, category, description, price, thumbnail, code, stock, status }
//         manager.products.push(productCreated)

    }


    getProducts = async() => {
        return await this.readProducts()
    }

    getProductsById = async(pid) => {
        const products = await this.readProducts()
        const productById = products.find((prod) => prod.id === pid)
        if (!productById) return "Product not found"
        return productById
    }

    updateProduct = async(pid, product) => {
        const products = await this.readProducts();
        const productIndex = products.findIndex((prod) => prod.id === pid);
        if (productIndex === -1) return "Product not found";
        products[productIndex] = { ...product, id: pid };
        await this.writeProducts(products);
        return "Product updated"
    }

    deleteProductsById = async(pid) => {
        const products = await this.readProducts()
        const productIndex = products.findIndex((prod) => prod.id === pid)
        if (productIndex === -1)
        return "Product not found"
        const productAll = [...products.slice(0, productIndex), ...products.slice(productIndex + 1)]
        await this.writeProducts(productAll)
        return "Product deleted"
    }

}


export default ProductManager









