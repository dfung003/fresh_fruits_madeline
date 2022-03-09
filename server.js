/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

require('dotenv').config(); // Loads environment variables into process.env
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
// const mongoose = require('./models/connection');
const fruitController = require('./controllers/fruits');
const path = require('path'); // built in node module we use to resolve paths more on this when we use it



/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////

const app = express();
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////

app.use(morgan("tiny")); // logging
app.use(express.urlencoded({extended: true})); // override for put and delete requests from forms
app.use(methodOverride("_method")); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

app.use('/fruits', fruitController)
app.get('/', (req, res) => {
    res.send("Your server is running... better go catch it.")
});



//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now listening on Port ${PORT}.`));