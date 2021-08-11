const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const session = require('express-session');
const port = process.env.PORT || 5000;
const app = new express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Acess-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  next();
});

app.use(session({      //session creation
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));


//jwt token

function verifyToken(req, res, next) {//token
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}


//routing starts

const login = require('./src/routes/login'); //login page
app.use('/login', login);

app.get('/logout', function (req, res) { //logout
  req.session.destroy();
});

const course = require('./src/routes/courses'); //course page
app.use('/course',verifyToken, course);

const enquiry = require('./src/routes/enquiry'); //enquiry page
app.use('/enquiryMenu', verifyToken, enquiry);

const staff = require('./src/routes/staff'); //enquiry page
app.use('/staffMenu', verifyToken, staff);

const application = require('./src/routes/application'); //partnership &corporate application page
app.use('/application',verifyToken, application);

const registration = require('./src/routes/registration'); //course registration page
app.use('/registration', verifyToken, registration);

const testimonials = require('./src/routes/testimonials'); // testimonials page
app.use('/testimonials', verifyToken, testimonials);

const events = require('./src/routes/events'); // testimonials page
app.use('/events', verifyToken, events);

const AdminUser = require('./src/routes/AdminUser'); //course registration page
app.use('/AdminUser', verifyToken, AdminUser);











app.listen(port, () => {
  console.log("Server ready at" + port)
});