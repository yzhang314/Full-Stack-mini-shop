
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/mini-shop');

var Product = require('./model/product');
var WishList = require('./model/wishlist');

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/product',function(request, response) {
    var product = new Product();
    product.title = request.body.title;
    product.price = request.body.price;

   product.save(function(err, savedProduct) {
       if (err) {
           response.status(500).send({error:"Could not save product"});
       } else {
           response.status(200).send(savedProduct);
           //only sned the newly added product
       }

   });

});

app.get('/product', function(request, response) {
//asynchronously it will print 1 3 2
    //console.log(1);
    Product.find({}, function(err, products) {
        if (err) {
            response.status(500).send({error:"Could not fetch products"});
        } else {

            response.send(products);
            //send all products
        }
        //console.log(2);

    });

    //console.log(3);

});

app.get('/wishlist', function(request, response){
    WishList.find({}).populate({path:'products', model:'Product'}).exec(function(err, wishLists){
        if (err) {
            response.status(500).send({error:"Could not fetch wishlists"});
        } else {
            response.status(200).send(wishLists);
        }

    });

});

app.post('/wishlist', function(request, response) {
   var wishList = new WishList();
   wishList.title = request.body.title;

   wishList.save(function(err, newWishList) {
       if (err) {
           response.status(500).send({error:"Could not create wishlist"});
       } else {
           response.status(200).send(newWishList);
           //only sned the newly added product
       }

   })
});

app.put('/wishlist/product/add', function(request, response) {
    Product.findOne({_id: request.body.productId}, function(err, product){
        if (err) {
            response.status(500).send({error:"Could not add item to wishlist"});
        } else {
            WishList.update({_id:request.body.wishListId},{$addToSet:
                {products:product._id}},function(err, wishList){
                if (err) {
                    response.status(500).send({error:"Could not add item to wishlist"});
                } else {
                    response.send("Successfully added to wishlist");
                }

            });

        }

    });

});

app.listen(3004, function(){
    console.log("Mini shop API running on port 3004...");
});