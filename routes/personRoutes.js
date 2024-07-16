const express= require('express');
const router= express.Router();
const Person = require("../models/Person");


router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
  
      const response = await newPerson.save();
      console.log("data sved");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Interal Server Error" });
    }
  });


//get metodnd find
router.get("/", async (req, res) => {
    try {
      const data = await Person.find();
      console.log("data find");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server eerror" });
    }
  });
  


  router.get("/:workType",async (req,res)=>{
    try{
        const workType= req.params.workType;
        if (workType=='chef' || workType=='manager' || workType=='waiter'){
const response= await Person.find({work:workType});
console.log("response fetched");
res.status(200).json(response);
        }
        else{
res.status(404).json({error:'Invalid work type'})
        }
    }
   catch(err){
console.log(err);
res.status(500).json({error:'Internal Server error'})
   }
  })

  // update
router.put('/:id',async (req,res)=>{
try{
const personId=req.params.id;
const updatedPersonData= req.body;

const response= await Person.findByIdAndUpdate(personId,updatedPersonData,{
  new:true, // return updated document
  runValidators:true //run mongose validation
})
if(!response){
  return res.status(404).json({error:'Person not found'});

}
console.log('data updated');
res.status(200).json(response);


}
catch(err){
console.log(err);
res.status(500).json({error:'Internal Server Error'})
}

})

//delete
router.delete('/:id',async (req,res)=>{
  try{
const personId= req.params.id;
const response = await Person.findByIdAndDelete(personId);
if(!response){
  return res.status(404).json({error:'Person not found'})
}
console.log('data deleted');
res.status(200).json({message:"person Deleted Successfully"})
  }
  catch(err){
console.log(err);
res.status(500).json({error:"Internal Server Error"})
  }
})

  module.exports= router;