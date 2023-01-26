let express = require('express');
let productRouter = express.Router();
let mongodb = require('mongodb').MongoClient;
let url = process.env.Mongo_Url;


function router(menu){
    productRouter.route('/')
        .get(function(req,res){
        mongodb.connect(url, function(err,dc){
            if(err) {
                res.status(500).send('Error While connecting')
            }else{
                let dbObj = dc.db('janmrng');
                dbObj.collection('products').find().toArray(function(err,products){
                    if(err){
                        res.status(203).send('Error While Fetching')
                    }else{
                        res.render('products',{products,title:'Products Page',menu})
                    }
                })
            }
        })
        
    })

    productRouter.route('/details')
        .get(function(req,res){
        res.send("Products Details")
    })

    return productRouter
}


module.exports = router;