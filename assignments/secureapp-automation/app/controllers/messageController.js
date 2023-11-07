'use strict';
var Service = require('../services/messageService');

exports.sendMessage = async (request, response) => {    
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        Service.sendMessage(request.body, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({error: false, message: "Message sent successfully!", data: result});
        });        
    }
};

exports.sendGroupMessage = async (request, response) => {    
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        Service.sendGroupMessage(request.body, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({error: false, message: "Message sent successfully!", data: result});
        });        
    }
};

exports.likeMessage = (request, response) => {
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ error: true, message: 'Please provide all required fields!' });
    }
    else{
        var messageId = request.params.id;
        var recipientId = request.body.RecipientId;
        var isLiked = request.body.IsLiked;

        Service.likeMessage(messageId, recipientId, isLiked, (err, result) => {
            if (err){
                response.send(err);
            }
                
            response.json({ error: false, message: 'Record updated successfully!' });
        });
    }
};