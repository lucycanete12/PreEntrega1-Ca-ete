import {Router} from 'express'
import ProductManager from '../ProductManager.js'

const productRouter = Router()
const productManager = new ProductManager('./data/products.json')

productRouter.get('/', async (req, res) => {
    const result = await productManager.getProducts()
    const limit = req.query.limit
    if(typeof result == 'string'){
        const error = result.split(' ')
        const errorMessage = error.slice(1).join(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({error: errorMessage})
    }
    res.status(200).json({status: 'success', payload: result.slice(0, limit)})
})

productRouter.get('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const result = await productManager.getProductById(pid)

    if(typeof result == 'string'){
        const error = result.split(' ')
        const errorMessage = error.slice(1).join(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({error: errorMessage})
    }
    res.status(200).json({status: 'success', payload: result})
})

productRouter.post('/', async (req, res) => {
    const product = req.body
    const result = await productManager.addProduct(product)

    if(typeof result == 'string'){
        const error = result.split(' ')
        const errorMessage = error.slice(1).join('')

        return res.status(parseInt(error[0].slice(1,4))).json({error: errorMessage})
    }
    return res.status(201).json({status: "success", payload: result})
})

productRouter.delete("/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid);
    const result = await productManager.deleteProduct(pid);
    return res.status(201).json({status: "succcess", payload: result})
})

export default productRouter