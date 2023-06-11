import { promises as fs } from 'fs'
import ProductManager from './ProductManager.js'


const productAll = new ProductManager

class CartManager {

    static id = 0

    constructor(){
        this.path = './src/models/cart.json'
        this.format = 'utf-8'
    }

    readCarts = async() => {
        const carts = await fs.readFile(this.path, this.format)
        return JSON.parse(carts)
    }

    writeCarts = async(cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    addCarts = async(cart) => {
        const oldCarts = await this.readCarts()
        
        CartManager.id++
        const newCart = {id: CartManager.id, products: []}
        const concatCarts = [...oldCarts, newCart]
        await this.writeCarts(concatCarts)
        return "Cart added"
    }

    getCartsById = async(cid) => {
        const carts = await this.readCarts()
        const cartById = carts.find(cart => cart.id === cid)
        if (!cartById) return "Cart not found"
        return cartById
    }

    addProductInCart = async(cartId, productId) => {
        const carts = await this.readCarts()
        const cartIndex = carts.findIndex((cart) => cart.id === cartId)
        if (cartIndex === -1) return "Cart not found"
        
        const products = await productAll.getProducts()
        const productIndex = products.findIndex((prod) => prod.id === productId)
        if (productIndex === -1) return "Product not found"


        // if(cartIndex.products.some((prod) => prod.id === productId)){
        //     const productInCart = cartIndex.product.find((cart) => cart.id === cartId)
        //     productInCart.cantidad++
        // }


        const cart = carts[cartIndex]
        const existingProduct = cart.products.find((p) => p.pid === productId)

        if (existingProduct) {
            existingProduct.cantidad += 1
        } else {
            cart.products.push({ pid: productId, cantidad: 1 })
        }
        await this.writeCarts(carts)
        return "Product added to the cart"
    }

}

export default CartManager


// exist = async (id) => {
//     const products = await this.readProducts()
//     return products.fin(prod => prod.id === id)
// }