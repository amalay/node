'use strict';
const jwt = require("jsonwebtoken");
const service = require('./userService');

exports.isValidToken = (request, response, next) => {
  let token = request.headers["x-access-token"];

  if (!token) {
    return response.status(403).send({ error: true, message: "No access token available!" });
  }

  jwt.verify(token, process.env.AUTH_SECRETKEY, (err, result) => {
    if (err) {
      return response.status(401).send({ error: true, message: "Invalid/Expired access token!" });
    }

    request.userId = result.id;

    next();
  });
};

exports.isAdmin = (request, response, next) => {
  service.getUser(request.userId, (err, result) => {
      if(result && Array.isArray(result) && result.length > 0){
          if(result[0].RoleId === 1){
              next();

              return;
          }
      }

      response.status(403).send({ error: true, message: "You are not having admin priviledge to perform this action!" });

      return;
  });
};

exports.isUser = (request, response, next) => {
  service.getUser(request.userId, (err, result) => {
      if(result && Array.isArray(result) && result.length > 0){
          if(result[0].RoleId === 2){
              next();
              
              return;
          }
      }

      response.status(403).send({ error: true, message: "You are not a valid user to perform this action!" });

      return;
  });
};
