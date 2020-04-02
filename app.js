const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const config = require('./config/keys');

//passport config
require('./config/passport')(passport);

//load routes
const index = require('./routes/index');
const auth = require('./routes/auth');

//map global promises
mongoose.Promise = global.Promise;

//mongoose connect
const db = config.mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => { console.log('MongoDB Connected') }
    )
    .catch(err => { console.log(err) });

const app = express();

//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//method override middleware
app.use(methodOverride('_method'));

app.use(cookieParser())
//express-session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//ejs middleware
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is running...')
})