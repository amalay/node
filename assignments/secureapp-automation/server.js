const express = require('express');
const bodyParser= require('body-parser')
const path = require('path');

const app = express();

//Override default view engine.
app.set('view engine', 'ejs');

//Override default view path.
app.set("views", path.resolve("./app/views"));
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a root route
app.get('/', (req, res) => {    
    res.json({"error" : false, "message" : "Hello Amalay! How are you?"});
});

require('./app/routes/authRoutes')(app);

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.listen(process.env.NODE_PORT, () => {
    console.log(`Server is listening on port ${process.env.NODE_PORT}`);
});
