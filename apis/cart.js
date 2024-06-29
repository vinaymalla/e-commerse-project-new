//import db schema
const Cart = require('../model/cart')
//const Users = require('../model/users')
//get all products
const cart_all = async (req, res) => {
    
}
//insert a product
const insert_cart = async (req, res) => {
    const cart = new Cart({
        c_id: req.body.c_id,
        c_name: req.body.c_name,
       
    })
    try {
        const savedcart = await cart.save()
        console.log('cart inserted')
        res.send(savedcart)
    }
    catch (error) {
        res.status(400).send(error)
    }
}
//update product
const update_cart = async (req, res) => {
    let c_id = req.body.c_id
    const cart = {
        c_name: req.body.p_name,
        
    }
    try {
        const updatecart = await Cart.updateOne(
            { p_id }, cart
        )
        if (updateProduct.modifiedCount != 0) {
            console.log('Product Updated', updatecart)
            res.send({ 'update': 'success' })
        }
        else {
            console.log('Product not updated')
            res.send({ 'update': 'Record Not Found' })
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
}


//delete product
const delete_cart = async (req, res) => {
    let p_id = req.body.p_id
    try {
        const deletedproduct = await Product.deleteOne({ p_id })
        if (deletedproduct.deletedCount != 0) {
            console.log('Product Deleted')
            res.send({ 'delete': 'success' })
        }
        else {
            console.log('Product Not deleted')
            res.send({ 'delete': 'Record Not Found' })
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
}
module.exports = {
    cart_all,
    insert_cart,
    update_cart,
    delete_cart
}
