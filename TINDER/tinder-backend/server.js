const express = require("express")
const mongoose = require("mongoose")
const cors=require("cors")
const Cards = require("./dbCards.js")
const dbCards = require("./dbCards.js")
const app=express()
const port=3001
mongoose.connect("mongodb://localhost:27017/tinderDB",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connented to Mongo Db")
})
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>res.status(200).send("Hello World"))
app.post("/tinder/cards" ,(req,res)=>{
    const dbCards=req.body
    Cards.create(dbCards,(err,data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})
app.get('/tinder/cards',(req,res)=>{
    Cards.find((err,data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})
app.listen(port,()=>{
    console.log(`Server Running on port : ${port}`)
})