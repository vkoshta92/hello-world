const express= require('express');
const router= express.Router();
const Person = require("../models/Person");
const {jwtAuthMiddleware,generateToken}=require('./../jwt')

router.post("/signup", async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
  
      const response = await newPerson.save();
      console.log("data sved");
      const payload={
        id:response.id,
        username:response.username
      }
      console.log(JSON.stringify(payload));
      // const token= generateToken(response.username);
      const token= generateToken(payload);

      console.log('token is',token);
      res.status(200).json({response:response,token:token});

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Interal Server Error" });
    }
  });

// login routes tki 30 sec me jwt token expire ho rha h to bar bar signup na krna pde 
// user ko token bhejte h login me .
router.post('/login',async(req,res)=>{
  try{
    const {username,password}= req.body;
    // find user by uername
    const user=await Person.findOne({username:username});
    // if user does not exist or password does not match , return error
    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error:'Invalid username or password'});
    }
//generate token
const payload={
  id: user.id,
  username:user.username

}
const token= generateToken(payload);
//return token
res.json({token});

  }
  catch(err){
console.err(err);
res.status(500).json({error:'internal server error'})
  }
})

//profile route
router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
  try{
    const userData= req.user;
    console.log('user data',userData);
    const userId=userData.id;
    const user = await Person.findById(userId);
res.status(200).json(user);
  }
  catch(err){
console.err(err);
res.status(500).json({error:'Internl Server error'});
  }
})


//get metodnd find
router.get("/", jwtAuthMiddleware,async (req, res) => {
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