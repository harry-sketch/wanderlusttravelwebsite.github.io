const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const port = 2000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/traveldata', {useNewUrlParser: true, useUnifiedTopology: true});

// Define Schema
const travelSchema = new mongoose.Schema({
    name: String,
    email:String,
    number:String,
    message:String
  });

//   Compiling Schema to Modal
const contact = mongoose.model('contact', travelSchema);

// Express Specific Stuff

app.use('/static',express.static('static')); // For serving static files
app.use(express.urlencoded())

// Set the template engine
    
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));;


// End Points

app.get('/',(req,res)=>{
    res.status(200).render('index.pug')
});

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug')
      
});
app.get('/portfolio',(req,res)=>{
    res.status(200).render('portfolio.pug')
      
});
app.get('/about',(req,res)=>{
    res.status(200).render('about.pug')
      
});

app.post('/contact',(req,res)=>{
    var myData = new contact(req.body)
    myData.save().then(()=>{
        res.send('Your data has been saved successfuuly');
    }).catch(()=>{
        res.status(400).send('Unexpexted Error');
    });
    

});

// Starting the server

app.listen(port,()=>{
    console.log(`The server started successfully on port ${port}`);
});