'use strict';
var User = require('../models/user');
var Service = require('../services/userService');

exports.createUser = async (request, response) => {    
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{        
        var user = new User(request.body);
        
        Service.createUser(user, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({error: false, message: "Record created successfully!", data: result});
        });        
    }
};

exports.updateUser = (request, response) => {
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        Service.updateUser(request.params.id, request.body, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({ error: false, message: 'Record updated successfully!' });
        });
    }
};

exports.deleteUser = (request, response) => {
    Service.deleteUser(request.params.id, (err, result) => {
        if (err){
            response.send(err);
        }
        
        response.json({ error: false, message: 'Record deleted successfully!' });
    });
};

exports.getUser = (request, response) => {
    Service.getUser(request.params.id, (err, result) => {
        if (err){
            response.send(err);
        }
            
        response.json({ error: false, data: result });
    });
};

exports.getUsers = (request, response) => {
    Service.getUsers((err, result) => {        
        if (err){
            response.send(err);
        }            
        
        response.send({ error: false, data: result });        
    });
};

exports.activateDeactivateUser = (request, response) => {
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        Service.activateDeactivateUser(request.params.id, request.body, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({ error: false, message: 'User activated/de-activated successfully!' });
        });
    }
};

exports.changeUserPassword = (request, response) => {
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        var password = bcrypt.hashSync(request.body.Password, 8);

        Service.changeUserPassword(request.params.id, password, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({ error: false, message: 'Password changed successfully!' });
        });
    }
};

