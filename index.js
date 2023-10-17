const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000


// MiddleWare
app.use(cors())
app.use(express.json())



app.get('/',(req,res)=>{
   res.send('The tech world is rocking')
})

app.listen(port,()=>{
    console.log(port,'is running')
})