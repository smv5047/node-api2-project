const express = require("express")

const router = express.Router()

let db = require('../data/db')

// router.post('/:id/comments', (req, res) => {
//     if(!req.body.text){
//         abort()
//         return res.status(400).json({errorMessage: "Please provide text for the comment."})
//     }
//     db.findById(req.params.id)
//         .then(data =>{
//             if(data === []) {
//                 return res.status(404).json({message: "The post with the specified ID does not exist."})
//             }

//         })
//     db.insertComment(req.body.comment)
//         .then(data => {
//             res.status(201).json(data)
//         })
//     .catch(err => {
//         res.status(500).json({error: "There was an error while saving the comment to the database"})
//     })
// })


router.get('/:id/comments', (req, res) => {
   db.findById(req.params.id)
    .then(data =>  {
       
        if(data.length > 0){
            return db.findPostComments(req.params.id)
        } 
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .then(data =>{
        res.status(200).json(data)
    })
    .catch(err =>{
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })

        
})

module.exports = router