const router = require('express').Router();
const userController = require('../Controllers/userController');


router.post('/createUser',userController.createUser);


module.exports = router;