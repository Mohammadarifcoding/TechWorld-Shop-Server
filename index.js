const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const port = process.env.PORT || 5000


// MiddleWare
app.use(cors())
app.use(express.json())

// TechWorld_Shop
//pGduoPZnJxt2M7X8

const uri = "mongodb+srv://TechWorld_Shop:pGduoPZnJxt2M7X8@cluster0.pdvgnv8.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const Service = client.db('TechWorld_Shop').collection('ServiceSection');
const Brand= client.db('TechWorld_Shop').collection('BrandName');
const BrandSlider= client.db('TechWorld_Shop').collection('BrandSlider');
const Product= client.db('TechWorld_Shop').collection('Brand_Product');
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    

    app.get('/service',async(req,res)=>{
        const cursor = Service.find()
        const result = await cursor.toArray()
        res.send(result)
    })
    app.get('/slider/:name',async(req,res)=>{
         const name = req.params.name
         const query = {brandName : name }
         const result = await BrandSlider.findOne(query)
         res.send(result)
    })

    app.get('/BrandProduct/:name',async(req,res)=>{
         const BrandName = req.params.name
         const query = {brandName :{$eq : BrandName}}
         const result = await Product.find(query).toArray()
         res.send(result)
    })
  app.get('/BrandProduct',async(req,res)=>{
    const AllBrand = Product.find()
    const result = await AllBrand.toArray()
    res.send(result)
  })
    app.get('/Brand',async(req,res)=>{
      const cursor = Brand.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
   res.send('The tech world is rocking')
})

app.listen(port,()=>{
    console.log(port,'is running')
})