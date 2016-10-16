// Created By Nitesh Jatav  on 15/10/2016
var express = require('express');
var controller = require('../controllers/controller');
var helper = require('../helper/response');
var auth = require('../helper/auth');
var router = express.Router();

router.post('/pets',[controller.addPet,helper.handleSuccess]);
router.get('/pets',[controller.getAllPets,helper.handleSuccess]);
router.post('/signup',[controller.register,auth.authentication,helper.handleSuccess]);
router.get('/users',[auth.authValidation,controller.getUser,helper.handleSuccess]);
router.post('/login',[controller.login,auth.authentication,helper.handleSuccess]);
router.post('/orders',[auth.authValidation,controller.getUser,controller.placeOrder,helper.handleSuccess]);
router.get('/orders',[auth.authValidation,controller.getUser,controller.getOrders,helper.handleSuccess]);

module.exports = router;