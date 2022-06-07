const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactdance',{useNewUrlParser: true});
const port = 4000;


// Mongoose Stuff 
// Define Mongoose schema 

const contactSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    Address: String,
    desc: String
  });


const contact = mongoose.model('contact', contactSchema);


//Express Stuff

app.use('/static',express.static('static'))
app.use(express.urlencoded({extended:true}))

//Pug Stuff

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

//End point

app.get('/',(req,res)=>{
    const send = {}
    res.render('home.pug',send)
})
app.get('/contact',(req,res)=>{
    const send = {}
    res.render('contact.pug',send)
})
app.post('/contact',(req,res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not save to the database")
    })
    // res.render('contact.pug')
})


//Server Stuff
app.listen(port,()=>{
    console.log(`App Started on ${port}`)
})