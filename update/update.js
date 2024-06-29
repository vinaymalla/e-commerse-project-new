const express = require('express')
let mongodb = require('mongodb')

const url = require('../url')
let mcl = mongodb.MongoClient
let router = express.Router()
let dbname = 'miniprj'

router.post("/", (req, res) => {
	let p_id = req.body.p_id
	let obj = {
    	"p_name": req.body.p_name,
    	"p_cost": req.body.p_cost
	}
	
    mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection:- ', err)
    	else {
        	let db = conn.db(dbname)
            db.collection('products').updateOne({ p_id }, { $set: obj }, (err, result) => {
                if (err)
                    res.json({ 'update': 'Error ' + err })
                else {
                    if (result.matchedCount != 0) {
                    	console.log("Data updated ")
                    	res.json({ 'update': 'success' })
                    } else {
                    	console.log("Data Not updated ")
                    	res.json({ 'update': 'Record Not found' })
                    }
                    conn.close()
                }
        	})
    	}
	})
})
//Update product in cart
router.post("/updateCart", (req, res) => {
	let p_id = req.body.p_id
	let u_name = req.body.u_name
	let obj = { "qty": req.body.qty }
	//connect to mongodb
    mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection:- ', err)
    	else {
        	let db = conn.db(dbname)
            db.collection('cart').updateOne({ p_id, u_name }, { $set: obj },
                (err, result) => {
                    if (err)
                    	res.json({ 'cartUpdate': 'Error ' + err })
                    else {
                    	if (result.matchedCount != 0) {
                        	console.log(`Cart data for ${u_name} updated`)
                        	res.json({ 'cartUpdate': 'success' })
                    	}
                    	else {
                            console.log(`Record not updated`)
                        	res.json({ 'cartUpdate': 'Record Not found' })
                    	}
                    	conn.close()
                    }
                })
    	}
	})
})
 
//Update user
//? ? ?
//export router
module.exports = router
