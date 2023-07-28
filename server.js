require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express();

app.use(express.json());
var cors = require('cors');
app.use(cors());
app.use(require("body-parser").json());
app.use(bodyParser.urlencoded({ extended: true }));


main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    const orderDetailsSchema = new mongoose.Schema({
        userDetails: Object,
        orderedItems: Object,
        price: Number
    })
    const productSchema = new mongoose.Schema({
        product: Object
    })
    const OrederedData = mongoose.model("OrederedData", orderDetailsSchema)
    const ProductData = mongoose.model("ItemData", productSchema)
    console.log("Connected to Database");

    app.get("/", function(req,res){
        
    })

    app.post("/orderDetails", async function (req, res) {
        const newData = req.body.data
        const amt = req.body.price
        const items = req.body.items
        console.log(newData)
        console.log(newData.Name)
        const datas = new OrederedData({
            userDetails: newData,
            orderedItems: items,
            price: amt
        })
        datas.save();
        console.log("Data inserted")
    })
    app.get("/itemDetails", async function(req,res){
        const foundItems = await ProductData.find()
        res.json({foundItemsArray: foundItems})
    })

    app.post("/itemDetails", async function(req, res){
        const productData = req.body.product
        const data = new ProductData({
            product: productData
        }) 
        data.save();
        console.log("Data successfully inserted")
    })

    



    app.listen(8080, async function () {
        console.log("Server is running on port : 8080");

    })
}