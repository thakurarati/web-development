const express = require('express')
const mysql = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./register')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017//TheMEntor');

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already have an account")
            } else {
                RegisterModel.create({ email: email, password: password })
                    .then(result => res.json("Account created"))
                    .catch(err => res.json("Error"))
            }
        }).catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running");
}) 