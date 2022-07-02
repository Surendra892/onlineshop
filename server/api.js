var mongoclient = require("mongodb").MongoClient;
var express = require("express");
var cors = require('cors');

var app = express();
var connectionstring = "mongodb://127.0.0.1:27017";


app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cors());

app.get("/categories", (req, res)=> {
    mongoclient.connect(connectionstring,(err,clientObj)=>{
        if(!err){
            var database= clientObj.db("demodb");
            database.collection("tblCategories").find({}).toArray((err,documents)=>{
                if(!err) {
                    res.send(documents);
                    res.end();
                }
            })
        }
    })
});

app.get("/category/:id",(req,res)=>{
    var id = parseInt(req.params.id);
    mongoclient.connect(connectionstring,(err,clientObj)=>{
        if(!err){
            var database= clientObj.db("demodb");
            database.collection("tblCategories").find({categoryid:id}).toArray((err,documents)=>{
                if(!err) {
                    res.send(documents);
                    res.end();
                }
            })
        }
    })
});

app.get("/products",(req,res)=>{
   
    mongoclient.connect(connectionstring,(err,clientObj)=>{
        if(!err){
            var database= clientObj.db("demodb");
            database.collection("tblProducts").find({}).toArray((err,documents)=>{
                if(!err) {
                    res.send(documents);
                    res.end();
                }
            })
        }
    })
});

app.get("/product/:id",(req,res)=>{
    var id = parseInt(req.params.id);
    mongoclient.connect(connectionstring,(err,clientObj)=>{
        if(!err){
            var database= clientObj.db("demodb");
            database.collection("tblProducts").find({Productid:id}).toArray((err,documents)=>{
                if(!err) {
                    res.send(documents);
                    res.end();
                }
            })
        }
    })
});

app.post("/addcategory",(req,res)=>{
    var newcategory = {
        categoryid : parseInt(req.body.categoryid),
        category : req.body.category
    };
    mongoclient.connect(connectionstring,(err,clientObj)=>{
        if(!err){
            var database= clientObj.db("demodb");
            database.collection("tblCategories").insertOne(newcategory,(err,result)=>{
                if(!err) {
                    console.log("new category added");
                }
            })
        }
    })
});

app.post("/addproduct",(req,res)=>{
    var newproduct = {
        Productid : parseInt(req.body.Productid),
        Name : req.body.Name,
        Price : parseFloat(req.body.Price),
        Stock : (req.body.Stock=="true")?true:false,
        Category : req.body.Category,
        Rating : parseFloat(req.body.Rating)
    };

    mongoclient.connect(connectionstring,(err,clientObj)=>{
        if(!err){
            var database = clientObj.db("demodb");
            database.collection("tblProducts").insertOne(newproduct,(err,result)=>{
                if(!err){
                    console.log("new product added");
                }
            })
        }
    })
});







app.listen(5050);
console.log("Server Started: http://localhost:5050");