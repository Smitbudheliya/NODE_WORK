const express = require('express');
const path = require('path');
const port = 8000;
const app = express();


app.set('view engine', 'ejs');
const db = require('./config/db');
const Admin = require('./model/adminModel')
const cookieParser = require('cookie-parser');
app.use(cookieParser())

const passport = require('passport');
const LocalStrategy = require('./config/LocalStrategy');
const session = require('express-session');

app.use(express.static(path.join(__dirname, 'assets'))) // css add 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(express.static(path.join(__dirname, 'uploads')));



app.use(session({
    name: 'testing',
    secret: 'admin-penal',
    resave: true,
    saveUninitialized: false,
    cookie: {
        max: 1000 * 60 * 60
    }
}))

app.use(passport.session());
app.use(passport.initialize());
app.use(passport.setAuthenticateUser); // set user in res.locals
app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`Server is running on port http://localhost:${port}`);
})