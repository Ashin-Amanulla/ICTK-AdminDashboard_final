const express = require('express');
let app = express.Router();
const jwt = require('jsonwebtoken');
const Eventdata = require('../modal/Eventdata');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');


//inserting Event details
app.post('/event-insert', function (req, res) {



  var event = {
    name: req.body.name,
    shortdetails: req.body.shortdetails,
    moredetails: req.body.moredetails,
    boxdetails: req.body.boxdetails,
    coordinatorsdetail: req.body.coordinatorsdetail,
    registrationlink: req.body.registrationlink,
    date: req.body.date,
    image: req.body.image,



  }
  var eventAdd = new Eventdata(event);
  eventAdd.save().then(function (data) {
    res.send(true)
  }).catch(function (error) {
    res.send(false)
  });

});



//deleting event
app.post('/event/remove', (req, res) => {
  console.log(req.body);
  id = req.body._id
  console.log(` inside remove ${id}`);
  Eventdata.deleteOne({ '_id': id })
    .then(function (event) {
      console.log('success')
      res.send(true);
    });

});

app.get('/event/:id', (req, res) => {

  const id = req.params.id;
  Eventdata.findOne({ "_id": id })
    .then((event) => {
      res.send(event);
    });
})

//udating event
app.post('/event/update', (req, res) => {

  let item = {
    name : req.body.name,
    shortdetails : req.body.shortdetails,
    moredetails : req.body.moredetails,
    boxdetails : req.body.boxdetails,
    coordinatorsdetail : req.body.coordinatorsdetail,
    registrationlink : req.body.registrationlink,
    brouchurelink : req.body.brouchurelink,
    programschedule : req.body.programschedule,
    speakerslist : req.body.speakerslist,
    button : req.body.button,
    date : req.body.date,
    image : req.body.image
  }

  let id = req.body._id;
  let updateT = { $set: item };

  Eventdata.findByIdAndUpdate({ _id: id }, updateT)
    .then((respond) => {
      if (respond) {
        console.log('mongoDb updated successfully for Course')
        res.send(true)
      }
      else {
        console.log('mongoDb update error', error)
        res.send(false)
      }
    });

});



//event update index
app.put('/events/updateIndex', (req, res) => {

  id = req.body._id;
  name = req.body.name;
  index = req.body.index;
  console.log(`update of ${name} with value ${index}`);
  Eventdata.findByIdAndUpdate({ "_id": id },
    { $set: { "index": index } })
    .then(function () {
      res.send();
    })

});

//getting event data
app.get('/events', function (req, res) {

  Eventdata.find().sort({ index: 1 })
    .then(function (events) {
      res.send(events);
    });
});

module.exports = app;