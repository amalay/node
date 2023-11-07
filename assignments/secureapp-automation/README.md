# Assignment
Develope a simple application in NodeJS which provide services to send individual/group messages and manage the data as per below scenarios:

#### Scenarios
* It should support role based user authentication and authorization mechanism.
* It should support at least two type of role <b>Admin</b> and <b>Basic</b>.
* Only authenticated user can execute the api methods.
* Only Admin can create/update/delete user.
* Only Admin can view the list of all users and their details.
* Basic user can view his details only.
* Any authenticated user can create/update/delete Group.
* Any authenticated user can search member in the group and also add member in the group.
* Any authenticated user can send message to individual user or in group.
* Any authenticated user can like the message or reply the message.

You have to also automate the complete unit testing process using any unit test framework of your choice.<br/><br/>
You can use any database of your choice to complete this assignment.


## Learnig steps


### Code setup from github

* Setup MYSQL Database at your local machine if not setup already.
* Open MYSQL shell or command prompt and run the scripts mentioned in <b>mySqlScripts.sql</b> file under project folder.
* Clone the project from github
* Set your MySql connection settings into config.js file under config folder
* Run npm install command on your terminal to install the required packages.
* Run npm start command on your terminal to start the application. You will see the screen as below:

![image](https://user-images.githubusercontent.com/84455469/129382586-ff55f3df-0d43-43a9-b54e-a925c1db0b84.png)

* Open postman and execute APIs with payload mentioned as below. 
* To execute the test cases defined in test.js file under test folder of the project, you have to open another terminal while keep running the first terminal.
* On the new terminal run the commad "mocha". It will run all the test cases and you can see the results on the same terminal. You will see the screen as below:

![image](https://user-images.githubusercontent.com/84455469/129382686-08f14670-7110-464c-9ee0-4224081ccc15.png)
![image](https://user-images.githubusercontent.com/84455469/129383392-987bac19-ff78-4cf0-8d4e-ce8e46c6ad4f.png)

### Required packages and commands to install
> npm install express --save-dev

> npm install mysql --save-dev

> npm install nodemon --save-dev

> npm install body-parser --save-dev

> npm install bcryptjs

> npm install jsonwebtoken

> npm install chai --save-dev

> npm install chai-http --save-dev

> npm install -g mocha --save-dev

> npm install supertest --save-dev

> npm install should --save-dev

> npm install dotenv --save-dev

### Sample Request and Response
#### A. SignIn API to get Access token
##### 1. POST: http://localhost:3000/api/auth/signIn
This is the SIGNIN API and will be accessed by any user to get Access token!
###### Payload: Invalid UserName in payload
```json
{
    "UserName": "test",
    "Password": "test"
}
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "error": true,
    "accessToken": null,
    "message": "User not found!"
}
```

###### OR
###### Payload: Invalid Password in payload
```json
{
    "UserName": "user",
    "Password": "xxxxx"
}
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "error": true,
    "accessToken": null,
    "message": "Invalid password!"
}
```

###### OR
###### Payload: Valid UserName and Password in payload with User Role
```json
{
    "UserName": "user",
    "Password": "user"
}
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "id": 2,
    "userName": "user",
    "email": "user@abc.com",
    "roleId": 2,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4",
    "message": "User signed in successfully!",
    "error": false
}
```

###### OR
###### Payload: Valid UserName and Password in payload with Admin Role
```json
{
    "UserName": "admin",
    "Password": "admin"
}
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "id": 1,
    "userName": "admin",
    "email": "admin@abc.com",
    "roleId": 1,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q",
    "message": "User signed in successfully!",
    "error": false
}
```

#### B. Authentication & Authorization APIs
##### 1. GET: http://localhost:3000/api/auth/default
This is the DEFAULT API and will be accessed by any user. Authentication/Authorization or Access token is not required to access this api!
###### Payload:
```json
Not Required
```

###### Authentication Header:
```json
Not Required
```

###### Response:
```json
{
    "error": false,
    "message": "Default page! It is accessible by all users."
}
```

##### 2. GET: http://localhost:3000/api/auth/user
This is the USER DASHBOARD API and will be accessed by only authenticated user. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
Not Required
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
Not Required
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "User Dashboard page! It is accessible by all authenticated users."
}
```

##### 3. GET: http://localhost:3000/api/auth/admin
This is the ADMIN DASHBOARD API and will be accessed by only authenticated user having Admin role. Authentication/Authorization and Access token are required to access this api!
###### Payload: With User Access token in request header
```json
Not Required
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": true,
    "message": "You are not having admin priviledge to perform this action!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
Not Required
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Admin Dashboard page! It is accessible only by authenticated users who has Admin role."
}
```

#### C. User APIs
##### 1. POST: http://localhost:3000/api/user
This is the CREATE USER API and will be accessed by only authenticated user having Admin role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{
    "UserName": "test",
    "Password": "test",
    "FirstName": "test",
    "LastName": "test",
    "Email": "test@abc.com"
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{
    "UserName": "test",
    "Password": "test",
    "FirstName": "test",
    "LastName": "test",
    "Email": "test@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": true,
    "message": "You are not having admin priviledge to perform this action!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{
    "UserName": "test",
    "Password": "test",
    "FirstName": "test",
    "LastName": "test",
    "Email": "test@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Record created successfully!",
    "data": 44
}
```

##### 2. PUT: http://localhost:3000/api/user/44
This is the UPDATE USER API and will be accessed by only authenticated user. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{    
    "FirstName": "test12",
    "LastName": "test12",
    "Email": "test12@abc.com"
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{    
    "FirstName": "test12",
    "LastName": "test12",
    "Email": "test12@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "Record updated successfully!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{    
    "FirstName": "test1234",
    "LastName": "test1234",
    "Email": "test1234@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Record updated successfully!"
}
```

##### 3. DELETE: http://localhost:3000/api/user/44
This is the DELETE USER API and will be accessed by only authenticated user having Admin role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": true,
    "message": "You are not having admin priviledge to perform this action!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Record deleted successfully!"
}
```

##### 4. GET: http://localhost:3000/api/user/2
This is the GET USER API and will be accessed by only authenticated user. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User or Admin Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "data": [
        {
            "Id": 2,
            "UserName": "user",
            "Password": "$2a$08$wRd3TZBfe9KctXm8GVk8JOZ3Rn1XY/.1c42UiFCvO.AtXFGO.nCNS",
            "FirstName": "Test",
            "LastName": "User",
            "Email": "user@abc.com",
            "RoleId": 2,
            "IsActive": 0
        }
    ]
}
```

##### 5. GET: http://localhost:3000/api/user
This is the GET USERS API and will be accessed by only authenticated user having admin role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": true,
    "message": "You are not having admin priviledge to perform this action!"
}
```

###### OR
###### Payload: With Admin access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "data": [
        {
            "Id": 1,
            "UserName": "admin",
            "Password": "$2a$08$UTr5G3B.3iGfwodXyU2RIeCH69xbHCKBnWOk38V6lHq5dh8Wo83Mm",
            "FirstName": "Test",
            "LastName": "Admin",
            "Email": "admin@abc.com",
            "RoleId": 1,
            "IsActive": 0
        },
        {
            "Id": 2,
            "UserName": "user",
            "Password": "$2a$08$wRd3TZBfe9KctXm8GVk8JOZ3Rn1XY/.1c42UiFCvO.AtXFGO.nCNS",
            "FirstName": "Test",
            "LastName": "User",
            "Email": "user@abc.com",
            "RoleId": 2,
            "IsActive": 0
        }
    ]
}
```

##### 6. PUT: http://localhost:3000/api/user/activateDeactivateUser/2
This is the ACTIVATE/DE-ACTIVATE USER API and will be accessed by only authenticated user having admin role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{    
    "IsActive": 1
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{    
    "IsActive": 1
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": true,
    "message": "You are not having admin priviledge to perform this action!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{    
    "IsActive": 1
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "User activated/de-activated successfully!"
}
```

##### 7. PUT: http://localhost:3000/api/user/changeUserPassword/2
This is the CHANGE USER PASSWORD API and will be accessed by only authenticated user. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{    
    "Password": "test"
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User or Admin Access token in request header
```json
{    
    "Password": "test"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "Password changed successfully!"
}
```

#### D. Group APIs
##### 1. POST: http://localhost:3000/api/group
This is the CREATE GROUP API and will be accessed by only authenticated user having Admin or Basic role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{
    "Name": "Test",
    "DisplayName": "Test",
    "EmailGroup": "test@abc.com"
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{
    "Name": "Test",
    "DisplayName": "Test",
    "EmailGroup": "test@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "Record created successfully!",
    "data": 43
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{
    "Name": "Test",
    "DisplayName": "Test",
    "EmailGroup": "test@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Record created successfully!",
    "data": 44
}
```

##### 2. PUT: http://localhost:3000/api/group/43
This is the UPDATE GROUP API and will be accessed by only authenticated user. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{
    "Name": "Test123",
    "DisplayName": "Test123",
    "EmailGroup": "test123@abc.com"
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{
    "Name": "Test123",
    "DisplayName": "Test123",
    "EmailGroup": "test123@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "Record updated successfully!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{
    "Name": "Test123",
    "DisplayName": "Test123",
    "EmailGroup": "test123@abc.com"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Record updated successfully!"
}
```

##### 3. DELETE: http://localhost:3000/api/user/43
This is the DELETE GROUP API and will be accessed by only authenticated user having Admin/Basic role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "Record deleted successfully!"
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Record deleted successfully!"
}
```

##### 4. GET: http://localhost:3000/api/group/2
This is the GET GROUP API and will be accessed by only authenticated user. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User or Admin Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
[
    {
        "Id": 2,
        "Name": "AllUser",
        "DisplayName": "All User",
        "EmailGroup": "alluser@abc.com"
    }
]
```

##### 5. GET: http://localhost:3000/api/group
This is the GET GROUP API and will be accessed by only authenticated user having Admin/Basic role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
Not required.
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
[
    {
        "Id": 1,
        "Name": "AllAdmin",
        "DisplayName": "All Admin",
        "EmailGroup": "alladmin@abc.com"
    },    
    {
        "Id": 2,
        "Name": "AllUser",
        "DisplayName": "All User",
        "EmailGroup": "alluser@abc.com"
    }
]
```

###### OR
###### Payload: With Admin access token in request header
```json
Not required.
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
[
    {
        "Id": 1,
        "Name": "AllAdmin",
        "DisplayName": "All Admin",
        "EmailGroup": "alladmin@abc.com"
    },    
    {
        "Id": 2,
        "Name": "AllUser",
        "DisplayName": "All User",
        "EmailGroup": "alluser@abc.com"
    }
]
```

##### 6. POST: http://localhost:3000/api/group/addUser
This is the ADD USER TO GROUP API and will be accessed by only authenticated user having Admin or Basic role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{
    "UserId": "5",
    "GroupId": "1"
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{
    "UserId": "5",
    "GroupId": "1"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "Record created successfully!",
    "data": 6
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{
    "UserId": "5",
    "GroupId": "1"
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Record created successfully!",
    "data": 7
}
```

##### 7. POST: http://localhost:3000/api/group/addUsers
This is the ADD USERS TO GROUP API and will be accessed by only authenticated user having Admin or Basic role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{    
    "GroupId": "2",
    "UserIds":[
        {
            "UserId": 1
        },
        {
            "UserId": 2
        },
        {
            "UserId": 3
        }
    ]
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{    
    "GroupId": "2",
    "UserIds":[
        {
            "UserId": 1
        },
        {
            "UserId": 2
        },
        {
            "UserId": 3
        }
    ]
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "Record created successfully!",
    "data": 10
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{    
    "GroupId": "2",
    "UserIds":[
        {
            "UserId": 1
        },
        {
            "UserId": 2
        },
        {
            "UserId": 3
        }
    ]
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Record created successfully!",
    "data": 11
}
```

#### E. Message APIs
##### 1. POST: http://localhost:3000/api/message
This is the SEND MESSAGE API and will be accessed by only authenticated user having Admin or Basic role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{
    "Message": "Individual Test Message!",
    "SenderId": 2,
    "RecipientId": 1
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{
    "Message": "Individual Test Message!",
    "SenderId": 2,
    "RecipientId": 1
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "Message sent successfully!",
    "data": {
        "MessageId": 1,
        "MessageRecipientId": 1
    }
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{
    "Message": "Individual Test Message!",
    "SenderId": 2,
    "RecipientId": 1
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Message sent successfully!",
    "data": {
        "MessageId": 2,
        "MessageRecipientId": 2
    }
}
```

##### 2. POST: http://localhost:3000/api/message/sendGroupMessage
This is the SEND GROUP MESSAGE API and will be accessed by only authenticated user having Admin or Basic role. Authentication/Authorization and Access token are required to access this api!
###### Payload: Without Access token in request header
```json
{
    "Message": "Group Test Message",
    "SenderId": 2,
    "GroupId": 5
}
```

###### Authentication Header:
```json
Required but not passing.
```

###### Response:
```json
{
    "error": true,
    "message": "No access token available!"
}
```

###### OR
###### Payload: With User Access token in request header
```json
{
    "Message": "Group Test Message",
    "SenderId": 2,
    "GroupId": 5
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI3NDYwNTcyLCJleHAiOjE2Mjc1NDY5NzJ9.Cv98nTvJqXneedDpaFpHVUOd_bMZVMbXFinejS-dPh4"
```

###### Response:
```json
{
    "error": false,
    "message": "Message sent successfully!",
    "data": null
}
```

###### OR
###### Payload: With Admin Access token in request header
```json
{
    "Message": "Group Test Message",
    "SenderId": 2,
    "GroupId": 5
}
```

###### Authentication Header:
```json
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3NDYwNjM2LCJleHAiOjE2Mjc1NDcwMzZ9.1ODpKZlgbyvnRmVXECJC_VVmZ_adoKNa0txwSIh8O9Q"
```

###### Response:
```json
{
    "error": false,
    "message": "Message sent successfully!",
    "data": null
}
```
