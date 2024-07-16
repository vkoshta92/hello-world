const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser"); // data ko confre krta h jo jaruri ho format convert keke bhejta h
app.use(bodyParser.json());
// const Person = require("./models/Person");
// const MenuItem= require('./models/MenuItem')

app.get("/", function (req, res) {
  res.send("welcome to my hotel how may i help you");
});
// create a new person doc usingg mongoose model
// app.post('/person',(req,res)=>{
// const data= req.body;
// // sortcut
// const newPerson= new Person(data);

// // ye lenty  trika h
// // newPerson.name= data.name;
// // newPerson.age= data.body;
// // newPerson.mobile= data.mobile;
// // newPerson.email= data.email;
// // newPerson.address= data.address;

// // har bar ye call back use nhi krenge
// // newPerson.save((error,savedPerson)=>{
// //     if(error){
// //         console.log('Error saving person ',error);
// //         res.status(500).json({error:'Internal server error'})
// //     }
// //     else{
// //         console.log('data saved succesfully');
// //         res.status(200).json(savedPerson);
// //     }
// // })

// })
//post// save



// menu
// app.post("/menu", async (req, res) => {
//     try {
//       const data = req.body;
//       const Menu = new MenuItem(data);
  
//       const response = await Menu.save();
//       console.log("data sved");
//       res.status(200).json(response);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ error: "Interal Server Error" });
//     }
//   });

 const personRoutes= require('./routes/personRoutes');
 app.use('/person',personRoutes);

 const menuRoutes= require('./routes/menuRoutes');
 app.use('/menu',menuRoutes);

app.listen(3000, () => {
  console.log("listing on port 3000");
});
