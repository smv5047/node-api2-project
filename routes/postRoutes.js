const express = require("express")

const router = express.Router()

let db = require('../data/db')

router.get('/', (req, res) => {
    db.find()
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return err.status(500).json({error: "The posts information could not be retrieved."})
        })
    
})

router.get('/:id', (req,res) => {

    db.findById(req.params.id)
        .then(data=>{
            if(data === []) {
                return res.status(404).json({message: "The post with the specified ID does not exist."})
            }
            return res.status(200).json(data)
        })
        .catch(err =>{
            return res.status(500).json({error: "The post information could not be retrieved."})
        })
})

router.post('/', (req,res) =>{
    if (!req.body.title || !req.body.contents){
       //need to cancel request
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
   
    db.insert(req.body)
        .then(data =>{
            return res.status(201).json(data)
          
        })
        .then(newData =>{
           return db.findById(newData) 
            }
        )
    
        .catch(err =>{
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    
   
})


module.exports = router