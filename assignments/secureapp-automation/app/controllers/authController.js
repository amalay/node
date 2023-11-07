'use strict';
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var service = require('../services/userService');

//Sign In & Sign Out
exports.signIn = (request, response) => {
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, accessToken: null, message: 'Please provide all required fields!' });
    }
    else{
        service.validateUser(request.body.UserName, (err, result) => {
            if (err){
                throw err;
            }
                
            if (!result || !Array.isArray(result) || result.length < 1) {
                return response.status(404).send({ error: true, accessToken: null, message: "User not found!" });
            }

            var userDetail = result[0];
            var isValidPassword = bcrypt.compareSync(request.body.Password, userDetail.Password);
            //var isValidPassword = (request.body.Password == userDetail.Password) ? true : false;

            if(!isValidPassword){
                return response.status(401).send({ error: true, accessToken: null, message: "Invalid password!" });
            }                

            var userToken = jwt.sign(
            { 
                id: userDetail.Id
            }, 
            process.env.AUTH_SECRETKEY, 
            {
                expiresIn: 86400 // 24 hours
            });

            response.status(200).send(
            {
                id: userDetail.Id,
                userName: userDetail.UserName,
                email: userDetail.Email,
                roleId: userDetail.RoleId,
                accessToken: userToken,
                message: "User signed in successfully!",
                error: false
            });
        });
    }
};

exports.signOut = (request, response) => {
    request.logout();    
    request.session = null;
    response.redirect('/');
};

//Demo
exports.default = (request, response) => {    
    response.status(200).send({error: false, message: "Default page! It is accessible by all users."});
};
  
exports.userDashboard = (request, response) => {
    response.status(200).send({error: false, message: "User Dashboard page! It is accessible by all authenticated users."});
};

exports.adminDashboard = (request, response) => {
    response.status(200).send({error: false, message: "Admin Dashboard page! It is accessible only by authenticated users who has Admin role."});
};

