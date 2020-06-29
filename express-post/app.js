const express = require('express');
const app = express();

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));

let accessCount = 0;

// this is our middleware
const count = () => {
    return (req, res, next) => {
        // console.log('hello from the middleware');
        accessCount++
        console.log(accessCount);
        next();
    }
}

// add middleware globally to every route
// app.use(count());

app.get('/', (req, res) => {
    res.render('form');
});

// the route the form data gets sent to
app.post('/login', (req, res) => {
    console.log('request body: ', req.body.username);
    // req.body - req.params - req.query
    res.render('dashboard', { name: req.body.username });
});

// add middleware to certain route
// app.get('/', count(), (req, res, next) => {
//     res.send('home');
// });


app.listen(3000);