const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
var db_url = 'mongodb://mada:madalina25@ds223605.mlab.com:23605/users'
const usersDb = db_url;

mongoose.connect(usersDb);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.listen(7070, () => {
    console.log('DB server started!');
} )

const User = require('./models/user.model');

app.post('/register', function (req, res) {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, (err, user) => {
        if (err) {
            return res.status(500).send("Cannot create user");
        }
        const token = jwt.sign({ id: user._id }, 'secretdiscret', {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ token: token });
    });

});

app.post ('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.status(422).send({ message: 'Username or password is invalid' });
        }

        const isPasswordValid = req.body.password == user.password;
        if (!isPasswordValid) {
            return res.status(422).send({ message: 'Username or password is invalid' });
        }

        // get authentication token
        const token = jwt.sign({ id: user._id }, 'secretdiscret', {
            expiresIn: 86400
        });
        return res.status(200).send({ token: token });
    });
});

module.exports = app;
