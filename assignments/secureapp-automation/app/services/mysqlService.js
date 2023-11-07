'use strict';
const mysql = require('mysql2');
const env = require('dotenv').config();
const dbConn = mysql.createConnection({ host: process.env.MYSQL_HOST, user: process.env.MYSQL_ROOT_USER, password: process.env.MYSQL_ROOT_PASSWORD, multipleStatements: true });

dbConn.connect(function(err) {
    if (err){
        throw err;
    } 
    
    console.log("Mysql database connected successfully!");
    //CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE};

    var sqlScript = `
    DROP DATABASE IF EXISTS ${process.env.MYSQL_DATABASE};
    CREATE DATABASE ${process.env.MYSQL_DATABASE}; 
    
    USE ${process.env.MYSQL_DATABASE};

    DROP TABLE IF EXISTS role;
    CREATE TABLE role 
    (
        Id int NOT NULL AUTO_INCREMENT,
        Name varchar(25) NOT NULL,
        DisplayName varchar(25) NOT NULL,
        PRIMARY KEY (Id),
        UNIQUE KEY Name_UNIQUE (Name)
    ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

    LOCK TABLES role WRITE;
    INSERT INTO role VALUES 
        (1, 'Admin', 'Admin'), 
        (2, 'Basic', 'Basic');
    UNLOCK TABLES;

    DROP TABLE IF EXISTS user;
    CREATE TABLE user 
    (
        Id int NOT NULL AUTO_INCREMENT,
        UserName varchar(25) NOT NULL,
        Password varchar(255) NOT NULL,
        FirstName varchar(25) NOT NULL,
        LastName varchar(25) NOT NULL,
        Email varchar(100) NOT NULL,
        RoleId int NOT NULL DEFAULT '2',
        IsActive tinyint NOT NULL DEFAULT '0',
        PRIMARY KEY (Id),
        UNIQUE KEY UserName_UNIQUE (UserName),
        UNIQUE KEY Email_UNIQUE (Email),
        KEY FK_Role_User_idx (RoleId),
        CONSTRAINT FK_Role_User FOREIGN KEY (RoleId) REFERENCES role (Id)
    ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

    LOCK TABLES user WRITE;
    INSERT INTO user (Id, UserName, Password, FirstName, LastName, Email, RoleId, IsActive) VALUES 
        (1, 'admin', '$2a$08$UTr5G3B.3iGfwodXyU2RIeCH69xbHCKBnWOk38V6lHq5dh8Wo83Mm', 'Test', 'Admin', 'admin@abc.com', 1, 1),
        (2, 'user', '$2a$08$wRd3TZBfe9KctXm8GVk8JOZ3Rn1XY/.1c42UiFCvO.AtXFGO.nCNS', 'Test', 'User', 'user@abc.com', 2, 1);
    UNLOCK TABLES;

    DROP TABLE IF EXISTS \`group\`;
    CREATE TABLE \`group\` 
    (
        Id int NOT NULL AUTO_INCREMENT,
        Name varchar(25) NOT NULL,
        DisplayName varchar(45) NOT NULL,
        EmailGroup varchar(100) DEFAULT NULL,
        PRIMARY KEY (Id),
        UNIQUE KEY Name_UNIQUE (Name)
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

    LOCK TABLES \`group\` WRITE;
    INSERT INTO \`group\` VALUES 
        (1, 'AllAdmin', 'All Admin', 'alladmin@abc.com'),        
        (2, 'AllUser', 'All User', 'alluser@abc.com');
    UNLOCK TABLES;

    DROP TABLE IF EXISTS usergroup;
    CREATE TABLE usergroup 
    (
        Id int NOT NULL AUTO_INCREMENT,
        UserId int NOT NULL,
        GroupId int NOT NULL,
        PRIMARY KEY (Id),
        KEY FK_Group_UserGroup_idx (GroupId),
        KEY FK_User_UserGroup_idx (UserId),
        CONSTRAINT FK_Group_UserGroup FOREIGN KEY (GroupId) REFERENCES \`group\` (Id),
        CONSTRAINT FK_User_UserGroup FOREIGN KEY (UserId) REFERENCES user (Id)
    ) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

    LOCK TABLES usergroup WRITE;
    INSERT INTO usergroup VALUES 
        (1, 1, 1),        
        (2, 1, 2),
        (3, 2, 2);
    UNLOCK TABLES;

    DROP TABLE IF EXISTS message;
    CREATE TABLE message 
    (
        Id int NOT NULL AUTO_INCREMENT,
        Message varchar(255) NOT NULL,
        SenderId int NOT NULL,
        SentAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (Id)
    ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

    DROP TABLE IF EXISTS messagerecipients;
    CREATE TABLE messagerecipients
    (
        Id int NOT NULL AUTO_INCREMENT,
        MessageId int NOT NULL,
        RecipientId int NOT NULL,
        ReceivedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        IsLiked tinyint NOT NULL DEFAULT '0',
        PRIMARY KEY (Id),
        KEY FK_Message_MessageRecipients_idx (MessageId),
        CONSTRAINT FK_Message_MessageRecipients FOREIGN KEY (MessageId) REFERENCES message (Id)
    ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

    `;

    dbConn.query(sqlScript, (err, result) => {
        if(err) {                    
            throw err;
        }

        console.log(`MySql script executed successfully!`);        
    });
});

module.exports = dbConn;