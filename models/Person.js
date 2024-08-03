const mongoose= require('mongoose');
const { type } = require('os');
const bcrypt= require('bcrypt');

const personSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
work :{
    type:String,
    enum:['chef','waiter','manager'],
    required:true
},
mobile:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
address:{
    type:String,
    
},
salary:{
    type:String,
    required:true
},
username:{
    required:true,
    type:String
},
password:{
    required:true,
    type:String
}
})
personSchema.pre('save',async function(next){
    const person=this;
    //hash the password ony if it has been modified(or is new)
if(!person.isModified('password')) return next(); // no need hash


    try{
// hash password generate
const salt =await bcrypt.genSalt(10);

// hash password
const hashPassword= await bcrypt.hash(person.password,salt);

// override the plin password with the hashed one
person.password= hashPassword;
        next();
    }
    catch(err){
return next(err);
    }
})

personSchema.methods.comparePassword=async function(candidatePassword){
try{
    // use bcrypt provided pass with hash password
    // prince->hghhfhjfhjfjhf
    //login->agarwal
    //  hghhfhjfhjfjhf--> extract salt from prince
    //salt+agarwal->hash->hgjgghjhjfhfhfhfhfhfh  now check is same
    const isMatch= await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
}
catch(err){
    throw err;
}
}

const Person= mongoose.model('Person',personSchema);
module.exports=Person;