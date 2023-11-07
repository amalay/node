'use strict';
var Service = require('../services/groupService');


exports.createGroup = async (request, response) => {    
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{        
        Service.createGroup(request.body, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({error: false, message: "Record created successfully!", data: result});
        });        
    }
};

exports.updateGroup = (request, response) => {
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        Service.updateGroup(request.params.id, request.body, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({ error: false, message: 'Record updated successfully!' });
        });
    }
};

exports.deleteGroup = (request, response) => {
    Service.deleteGroup(request.params.id, (err, result) => {
        if (err){
            response.send(err);
        }
        
        response.json({ error: false, message: 'Record deleted successfully!' });
    });
};

exports.getGroup = (request, response) => {
    Service.getGroup(request.params.id, (err, result) => {
        if (err){
            response.send(err);
        }
            
        response.json({ error: false, data: result });
    });
};

exports.getGroups = (request, response) => {
    Service.getGroups((err, result) => {        
        if (err){
            response.send(err);
        }            
        
        response.send({ error: false, data: result });        
    });
};


exports.addUser = (request, response) => {    
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        Service.addUser(request.body, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({error: false, message: "Record created successfully!", data: result});
        });        
    }
};

exports.addUsers = (request, response) => {    
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        Service.addUsers(request.body, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({error: false, message: "Record created successfully!", data: result});
        });        
    }
};