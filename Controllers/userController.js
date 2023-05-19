const User = require('../Models/user');
const logger = require('../Logger/logger');

exports.createUser = async (req,res)=>{
   try{
    logger.info(`Creating user for ${req.body}`);
    const newUser = new User({
        name:req.body.name,
        number:req.body.number,
        emailId:req.body.emailId
    });
    await newUser.save();
    res.status(201).json({message:"user created successfully",data:newUser});
    logger.info(`Create  User API executed for ${req.body}`)
   }catch(err){
    res.status(500).json({ message: err.message });
   }
}
