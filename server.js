require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');
const app = express();

const {engine} = require('express-handlebars');

app.use(cookieParser());
app.use(checkAuth);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Set db
require('./data/reddit-db');

require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

app.listen(3000);

module.exports = app;