'use strict';
var dbConn = require('./mysqlService');

exports.sendMessage = (data, callback) => {
    var message = {
        Message: data.Message,
        SenderId: data.SenderId
    };

    dbConn.query("INSERT INTO message set ?", message, (err, messageResponse) => {
        if(err) {                    
            throw err;
        }
        
        var messageRecipient = {
            MessageId: messageResponse.insertId, 
            RecipientId: data.RecipientId
        };

        var response = {
            MessageId: messageResponse.insertId,
            MessageRecipientId: 0
        };

        dbConn.query("INSERT INTO messageRecipients set ?", messageRecipient, (err, messageRecipientResponse) => {
            if(err) {                    
                throw err;
            }

            response.MessageRecipientId = messageRecipientResponse.insertId;

            callback(null, response);
        }); 
    });
};

exports.sendGroupMessage = (data, callback) => {
    var message = {
        Message: data.Message,
        SenderId: data.SenderId
    };

    dbConn.query("Select userId from userGroup where groupId = ? ", data.GroupId, (err, userIds) => {
        if(err) {                    
            throw err;
        }

        if (userIds && Array.isArray(userIds) && userIds.length > 0) {
            dbConn.query("INSERT INTO message set ?", message, (err, messageResponse) => {
                if(err) {                    
                    throw err;
                }

                var response = {
                    MessageId: messageResponse.insertId,
                    MessageRecipientIds: []
                };

                var sql = "INSERT INTO messageRecipients (MessageId, RecipientId) VALUES ?";
                var values = [];

                userIds.forEach(element => {
                    values.push([messageResponse.insertId, element.userId]);                           
                });

                dbConn.query(sql, [values], (err, messageRecipientResponse) => {
                    if(err) {                    
                        throw err;
                    }

                    callback(null, response);
                });
            });
        }
    });
};

exports.likeMessage = (messageId, recipientId, isLiked, callback) => {
    dbConn.query("UPDATE messageRecipients SET IsLiked = ? WHERE MessageId = ? AND RecipientId = ?", [isLiked, messageId, recipientId], (err, result) => {
        if(err) {                    
            throw err;
        }
        
        callback(null, result);
    });
};