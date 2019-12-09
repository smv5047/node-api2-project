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

// TODO - RETURN POST

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

router.delete('/:id', (req, res) => {


    db.findById(req.params.id)
        .then(data => {
            if (data.length>0) {
                return db.remove(req.params.id).then(()=>data)
            }
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        })
        .then(data => {
            console.log(data)
            res.json(data)})
        .catch(err => {
            res.status(500).json({error: "The post could not be removed"})
        })
    // if (!req.params.id) {
    //     res.status(404).json({ message: "The post with the specified ID does not exist."})
    // }
    // db.remove(req.params.id)
    //     .then(data =>{
    //         res.status(204).json(data)
    //     })
    //     .catch(err => {
    //         res.status(500).json({})
    //     })

    
})

module.exports = router