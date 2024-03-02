const express = require("express");
const mongoose = require("mongoose"); //mongoose da monodb ima zadane datatypeove
const bodyParser = require("body-parser");
const app = express();
const { verifyToken } = require("./validation");

//swagger dependencies
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');

//setup swagger
const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDefinition));

//import movie routes and validation
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");

require("dotenv-flow").config();

// parse request of content-type JSON
app.use(bodyParser.json());



mongoose.connect
(
    process.env.DBHOST,
    {
        // useUnifiedToplogy: true,
        // useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MongoDB:" + error));

mongoose.connection.once("open", () => console.log("Connected succesfully to MongoDB"));

//route
app.get("/api/welcome", (req, res) => {
    res.status(200).send({message: "Welcome to the MEN RESTful API"});
})

//post, put, delete--> CRUD
app.use("/api/movies", verifyToken, movieRoutes);
app.use("/api/user", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
})

module.exports = app;