const express= require('express');
const app= express();
const db= require('./db')

const bodyParser= require('body-parser'); // data ko confre krta h jo jaruri ho format convert keke bhejta h
app.use(bodyParser.json())
const Person= require('./models/Person')

app.get('/',function(req,res){
res.send("welcome to my hotel how may i help you")
})

app.post('/person',(req,res)=>{
const data= req.body;

// create a new person doc usingg mongoose model




// newPerson.name=data.name;
// newPerson.age=data.age;
// newPerson.mobile=data.mobile;
// newPerson.email=data.email;

// newPerson.save((error,person)=>{
// if(error){
//     console.log('error saving person:',error);
//     res.status(500).json({error:'Internal server error'})
// }
// else{
//     console.log('data saved successfully');
//     res.status(200).json(person)
// }
// }
// )





})

app.listen(3000,()=>{
    console.log('listing on port 3000');
})