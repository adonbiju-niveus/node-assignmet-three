const router = require('express').Router();
const userController = require('../Controllers/userController');


router.post('/createUser',userController.createUser);
router.get('/getAllUsers',userController.getAllUsers);


module.exports = router;