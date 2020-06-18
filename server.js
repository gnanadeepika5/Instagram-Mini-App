const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Body parser configuration
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

//Passport configuration
app.use(passport.initialize());
require('./config/passport')(passport);

//db configuration
const db = require('./config/keys').mongoURI;

//connect to the mongodb
mongoose.connect(db)
    .then(() => console.log('mongo db connected successfully'))
    .catch(err => console.log(err));

//test route
app.get('/', (req, res) => res.send('welcome :-)'));
//using routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//added port number
const port = 10000;
app.listen(port, () => console.log(`server running on port number ${port}`));