const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

// User agents request favicon.ico frequently and indiscriminately, so use this middleware before the logger middleware.
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const msg = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', msg + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    console.log(msg);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         barTitle: 'Some Website',
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        barTitle: 'Some Website',
        pageTitle: 'Welcome Page',
        welcomeMessage: 'Stop and stay a while.',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        barTitle: 'Some Website',
        pageTitle: 'About',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        barTitle: 'Some Website',
        pageTitle: 'Projects',
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error: bad request',
    })
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});