const User = require('../Models/user');
const logger = require('../Logger/logger');
const { error } = require('winston');

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
    logger.error(`Create  User API error:${error}`)
    res.status(500).json({ error: 'Failed to create user' });
   }
}

exports.getAllUsers = async (req,res)=>{
    logger.info(`Get all users api initiated`)
    try {
        const allUser = await User.find();
        if(allUser){
            logger.info(`get User API executed`)
            res.status(200).json({message:"success",data:allUser});
        }
        else{
            logger.error(`Get all users api error `)
            res.status(400).json({message:"Get all users api error"});
        }
    } catch (error) {
        logger.error(`Get all users api error ${error}`)
        res.status(500).json({ error: 'Failed to get users' });

    }
 }
