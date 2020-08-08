const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const stories = require('./routes/api/stories');
const search = require('./routes/api/search');
const communications = require('./routes/api/communications');
const logout = require('./routes/api/logout');
const path = require('path');

const app = express();
//const expressSwagger = require('express-swgger-generator')(app);

let options = {
    swaggerDefinition: {
        info: { 
            description: 'This is a API swagger to support the Instagram App',
            title: 'Swagger - Instagram API',
            version: '1.0.0',
        },
        host: 'localhost:10000',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};

expressSwagger(options)

//Body parser configuration
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Passport configuration
app.use(passport.initialize());
require('./config/passport')(passport);

//db configuration
const db = require('./config/keys').mongoURI;

//connect to the mongodb
mongoose
    .connect(db)
    .then(() => console.log('mongo db connected successfully'))
    .catch(err => console.log(err));

//test route
//app.get('/', (req, res) => res.send('welcome :-)'));

//using routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/stories', stories);
app.use('/api/logout',logout);
app.use('/api/search', search);
app.use('/api/communications', communications);

//serve static assets if in production
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('instagram-mini-app-client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'instagram-mini-app-client', 'build', 'index.html'));
    })
    }

//added port number
const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`server running on port number ${port}`));
