const express = require("express")
const app = express()

app.use(express.json())

const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')

app.use('/api/posts', postRoutes)
app.use('/api/posts', commentRoutes)

app.get('/', (req, res) =>{
    res.send("This is your server speaking")
})

//Express Server Setup - COMPLETE
const port = 8002
const host = "127.0.0.1" 

app.listen(port, host, ()=>{
    console.log(`Server running at http://${host}:${port}`)
})