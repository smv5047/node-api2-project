const express = require('express')

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


module.exports = router