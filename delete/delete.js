
const express = require('express')
let mongodb = require('mongodb')
const url = require('../url')
let mcl = mongodb.MongoClient

let router = express.Router()
let dbname = 'miniprj'
router.post("/", (req, res) => {
	let obj = {
    	"p_id": req.body.p_id
	}
	//connect to mongodb
	mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection:- ', err)
    	else {
        	let db = conn.db(dbname)
            db.collection('products').deleteOne(obj, (err, result) => {
                if (err)
 	               res.json({ 'delete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                    	console.log("Data deleted ")
                    	res.json({ 'delete': 'success' })
                    } else {
                    	console.log("Data Not deleted ")
                    	res.json({ 'delete': 'Record Not found' })
                    }
                    conn.close()
                }
        	})
    	}
	})
})
//Delete product from cart
router.post("/deleteCart", (req, res) => {
	let obj = {
    	"p_id": req.body.p_id,
    	"u_name": req.body.u_name
	}
	//connect to mongodb
    mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection:- ', err)
    	else {
        	let db = conn.db(dbname)
            db.collection('cart').deleteOne(obj, (err, result) => {
                if (err)
                    res.json({ 'cartDelete': 'Error ' + err })
                else {
                    if (result.deletedCount != 0) {
                    	console.log(`Cart data from ${obj.u_name} deleted`)
                    	res.json({ 'cartDelete': 'success' })
                    }
                    else {
                    	console.log('Cart Data Not deleted')
                    	res.json({ 'cartDelete': 'Record Not found' })
                    }
                    conn.close()
                }
            })
    	}
	})
})


module.exports = router
