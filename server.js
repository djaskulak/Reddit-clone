const express = require('express')
const {engine} = require('express-handlebars');

const app = express();

require('./controllers/posts')(app);
// Set db
require('./data/reddit-db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

//CASES RESOURCE

//NEW
app.get('/posts/new', (req, res) => {
    res.render('posts-new', {})
})

app.listen(3000);