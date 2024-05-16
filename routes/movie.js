const router = require("express").Router();
const movie = require("../models/movie");

//CRUD operations

// /api/movies/
//Create movie - post
router.post("/", (req, res) => {
    data = req.body;
    movie.insertMany(data)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send( { message: err.message }); })
});

// /api/movies/
//Read all movies - get
router.get("/", (req, res) => {
    
    movie.find()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send( { message: err.message }); })
});

//Read all movies in stock - get
router.get("/instock", (req, res) => {
    
    movie.find({ inStock: true })
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send( { message: err.message }); })
});

//Read specific movie - get
router.get("/:id", (req, res) => {
    
    movie.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send( { message: err.message }); })
});



//Update specific movie - put
router.put("/:id", (req, res) => {

    const id = req.params.id;

    movie.findByIdAndUpdate(id, req.body)
    .then(data => { 
        if (!data) 
        {
            req.status(404).send({ message: "Cannot update movie with id=" + id + ". Maybe movie was not found!"})
        }
        else 
        {
            res.send({ message: "Movie was succesfully updated."})
        }
        res.send(data); 
    })
    .catch(err => { res.status(500).send( { message: "Error updating movie with id=" + id}); })
});

//Delete specific movie - delete
router.delete("/:id", (req, res) => {

    const id = req.params.id;

    movie.findByIdAndDelete(id)
    .then(data => { 
        if (!data) 
        {
            req.status(404).send({ message: "Cannot delete movie with id=" + id + ". Maybe movie was not found!"})
        }
        else 
        {
            res.send({ message: "Movie was succesfully deleted."})
        }
        res.send(data); 
    })
    .catch(err => { res.status(500).send( { message: "Error deleting movie with id=" + id}); })
});

module.exports = router;