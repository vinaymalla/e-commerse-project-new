//import modules
const express = require('express')
let mongodb = require('mongodb')
const url = require('../url')
let mcl = mongodb.MongoClient

let router = express.Router()

let dbname = 'miniprj'

router.get("/", (req, res) => {
	
   
    mcl.connect(url, (err, conn) => {
        
    	if (err)
  	      console.log('Error in connection')
    	else {
        	let db = conn.db(dbname)
            db.collection('products').find().toArray((err, array) => {
                
                if (err)
                    console.log('Error:- ', err)
                else {
                    console.log('Data Sent')
                    res.json(array)
                    conn.close()
                }
        	})
    	}
	})
})
 
//User login Authentication
router.post('/auth', (req, res) => {
	let u_name = req.body.u_name
	let upwd = req.body.upwd
	let obj = { u_name, upwd }
	//connect to mongodb
    mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection:- ', err)
    	else {
        	let db = conn.db(dbname)
            db.collection('users').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    if (array.length > 0)
                    	res.json({ 'auth': 'success', 'user': u_name })
                    else
                    	res.json({ 'auth': 'failed' })
                    console.log('Auth response sent')
                    conn.close()
                }
        	})
    	}
	})
})

//Fetch cart data
router.post("/fetchCart", (req, res) => {
	let u_name = req.body.u_name
	let obj = { u_name }

    mcl.connect(url, (err, conn) => {
    	if (err)
            console.log('Error in connection:- ', err)
    	else {
        	let db = conn.db(dbname)
            db.collection('cart').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    res.json(array)
                    console.log(`Cart response for ${obj.u_name} sent`)
                    conn.close()
                }
        	})
    	}
	})
})
 

module.exports = router