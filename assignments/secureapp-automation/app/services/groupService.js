'use strict';
var dbConn = require('./mysqlService');

exports.createGroup = async (data, callback) => {
    dbConn.query("INSERT INTO `group` set ?", data, (err, result) => {
        if(err) {                    
            throw err;
        }
        
        callback(null, result.insertId);
    });
};

exports.updateGroup = async (id, data, callback) => {
    dbConn.query("UPDATE `group` SET Name = ?, DisplayName = ?, EmailGroup = ? WHERE id = ?", [data.Name, data.DisplayName, data.EmailGroup, id], async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
}

exports.deleteGroup = async (id, callback) => {
    dbConn.query("DELETE FROM usergroup WHERE GroupId = ?", [id], async (err, result) => {
        if(err) {                    
            throw err;
        }

        dbConn.query("DELETE FROM `group` WHERE id = ?", [id], async (err, result) => {
            if(err) {                    
                throw err;
            }
    
            callback(null, result);
        });
    });    
}

exports.getGroup = async (id, callback) => {
    dbConn.query("Select * from `group` where id = ? ", id, async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
};

exports.getGroups = async (callback) => {
    dbConn.query("Select * from `group`", async (err, result) => {
        if(err) {                    
            throw err;
        }

        callback(null, result);
    });
};

exports.addUser = async (data, callback) => {
    dbConn.query("INSERT INTO userGroup set ?", data, (err, result) => {
        if(err) {                    
            throw err;
        }
        
        callback(null, result.insertId);
    });
};

exports.addUsers = function (data, callback) {
    var sql = "INSERT INTO userGroup (GroupId, UserId) VALUES ?";
    var values = [];

    data.UserIds.forEach(element => {
        values.push([data.GroupId, element.UserId]);                           
    });

    dbConn.query(sql, [values], (err, result) => {
        if(err) {                    
            throw err;
        }
        
        callback(null, result.insertId);
    });
};