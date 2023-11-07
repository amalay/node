const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const groupController = require("../controllers/groupController");
const messageController = require("../controllers/messageController");
const tokenService = require('../services/tokenService');

module.exports = function(app) {
    app.use(function(request, response, next) {
        response.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    //Auth routes
    app.post("/api/auth/signIn", authController.signIn);
    app.post("/api/auth/signOut", [tokenService.isValidToken], authController.signOut);

    //Demo routes
    app.get("/api/auth/default", authController.default);
    app.get("/api/auth/user", [tokenService.isValidToken], authController.userDashboard);
    app.get("/api/auth/admin", [tokenService.isValidToken, tokenService.isAdmin], authController.adminDashboard);

    //User routes
    app.post("/api/user", [tokenService.isValidToken, tokenService.isAdmin], userController.createUser);    
    app.put("/api/user/:id", [tokenService.isValidToken], userController.updateUser);        
    app.delete("/api/user/:id", [tokenService.isValidToken, tokenService.isAdmin], userController.deleteUser);    
    app.get("/api/user/:id", [tokenService.isValidToken], userController.getUser);
    app.get("/api/user", [tokenService.isValidToken, tokenService.isAdmin], userController.getUsers);

    //Group Routes
    app.post("/api/group", [tokenService.isValidToken], groupController.createGroup);
    app.put("/api/group/:id", [tokenService.isValidToken], groupController.updateGroup); 
    app.delete("/api/group/:id", [tokenService.isValidToken], groupController.deleteGroup);
    app.get("/api/group/:id", [tokenService.isValidToken], groupController.getGroup);
    app.get("/api/group", [tokenService.isValidToken], groupController.getGroups);
    
    app.post("/api/group/addUser", [tokenService.isValidToken], groupController.addUser);
    app.post("/api/group/addUsers", [tokenService.isValidToken], groupController.addUsers);   

    //Message Routes
    app.post("/api/message", [tokenService.isValidToken], messageController.sendMessage);
    app.post("/api/message/sendGroupMessage", [tokenService.isValidToken], messageController.sendGroupMessage);
    app.put("/api/message/:id", [tokenService.isValidToken], messageController.likeMessage);
    //app.delete("/api/message/:id", [tokenService.isValidToken], messageController.deleteMessage);
};