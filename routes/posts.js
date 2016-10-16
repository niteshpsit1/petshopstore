// Created By Nitesh Jatav on 16/10/2016
var express = require('express');
var controller = require('../controllers/controller');
var postController = require('../controllers/posts');
var helper = require('../helper/response');
var auth = require('../helper/auth');
var router = express.Router();

router.use(auth.authValidation);
router.post('/',[controller.getUser,postController.createPost,helper.handleSuccess]);
// router.get('/pets',[controller.getAllPets,helper.handleSuccess]);
// router.post('/signup',[controller.register,auth.authentication,helper.handleSuccess]);
// router.get('/users',[auth.authValidation,controller.getUser,helper.handleSuccess]);
// router.post('/login',[controller.login,auth.authentication,helper.handleSuccess]);
// router.post('/orders',[auth.authValidation,controller.getUser,controller.placeOrder,helper.handleSuccess]);
// router.get('/orders',[auth.authValidation,controller.getUser,controller.getOrders,helper.handleSuccess]);

module.exports = router;