class ProductsManager {
    #products
    #error
    constructor(){
        this.#products = []
        this.#error = undefined
    }
    
    getProducts = () => this.#products

    getProductById = (id) => {
        const product = this.#products.find(item=> item.id === id)
        if (!product) return "Not found"
        return product
    }
    
    #generateId = () => (this.#products.length === 0) ? 1 : this.#products[this.#products.length-1].id + 1

    #validate = (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            this.#error = `${title} tiene campos incompletos` 
        } else {
            const found = this.#products.find(item => item.code === code)
            if (found) this.#error = `${title} el código ya existe` 
            else this.#error = undefined
        }      
    } 
    

    addProduct = (title, description, price, thumbnail, code, stock) => {
        this.#validate(title, description, price, thumbnail, code, stock)
        if (this.#error === undefined) 
            this.#products.push({id: this.#generateId(), title, description, price, thumbnail, code, stock})
        else 
            console.log(this.#error)
    }
}

const productsManager = new ProductsManager()
productsManager.addProduct('Adidas Adizero', 'Zapatillas deportivas', 30000, 'https://craftypixels.com/placeholder-image/300', 1010, 4)
productsManager.addProduct('Adidas Runfalcon', 'Zapatillas deportivas', 40000, 'https://craftypixels.com/placeholder-image/300', 1020, 3)
productsManager.addProduct('Adidas Predator', 'Zapatillas deportivas', 20000, 'https://craftypixels.com/placeholder-image/300', 1030, 6)
productsManager.addProduct('Adidas Forum', 'Zapatillas deportivas', 50000, 'https://craftypixels.com/placeholder-image/300', 1030, 1)
productsManager.addProduct('Adidas Galaxy', 'Zapatillas deportivas', 60000, 1050, 10)


console.log(productsManager.getProducts())
console.log(productsManager.getProductById(7))