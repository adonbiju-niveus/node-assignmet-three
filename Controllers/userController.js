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
    logger.info(`Create  User API executed sucessfully for ${req.body}`)
   }catch(error){
    logger.error(`Create  User API error:${error}`)
    res.status(500).json({ error: 'Failed to create user' });
   }
}

exports.getAllUsers = async (req,res)=>{
    logger.info(`Get all users api initiated`)
    try {
        const allUser = await User.find();
        if(allUser?.length>0){
            logger.info(`get All Users API executed sucessfully `)
            res.status(200).json({message:"success",data:allUser});
        }
        else{
            logger.error(`There is no user found `)
            res.status(404).json({message:"There is no user found"});
        }
    } catch (error) {
        logger.error(`Get all users api error ${error}`)
        res.status(500).json({ error: 'Failed to get users' });

    }
 }


exports.updateUser = async (req,res)=>{
    try {
        logger.info(`Updating user for ${req.body} and for query ${req.params} as initiated`);
        const emailId=req.params.emailId;
        const user = await User.findOne({emailId:emailId});
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          logger.info('user not found');
        } else {
           const updatedUser= await User.findOneAndUpdate({ emailId: emailId }, req.body, { new: true });
          res.status(200).json({message:"user updated successfully",data:updatedUser});
          logger.info(`Update User API executed sucessfully for ${req.body}`)
        }

    }catch(error){
        logger.error(`Failed to update user: ${error}`)
        res.status(500).json({ error: 'Failed to update a user' });
    }
}