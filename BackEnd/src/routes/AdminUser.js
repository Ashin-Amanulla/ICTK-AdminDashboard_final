const express = require('express');
let app = express.Router();
const multer = require('multer');
const path = require('path');


const SignUpData = require('../modal/SignupData');


app.get('/AdminUserList', function (req, res) {
  SignUpData.find().sort({ firstname: -1 })
    .then(function (users) {
      res.send(users);
    });
});

app.get('/AdminUserDetails/:id', (req, res) => {
  const id = req.params.id;
  SignUpData.findOne({ "_id": id })
    .then((user) => {
      res.send(user);
    });
});

app.post('/insert/', function (req, res) {
  var User = {

    add: req.body.add,
    superadmin: req.body.superadmin,
    delete: req.body.delete,
    edit: req.body.edit,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }
  var UserItem = new SignUpData(User);
  UserItem.save().then(function (data) {
    res.send(true)
  }).catch(function (error) {
    res.send(false)
  });
});

app.post('/remove', (req, res) => {
  console.log(req.body);
  id = req.body._id
  console.log(` inside remove ${id}`);
  SignUpData.findByIdAndDelete({ '_id': id },
    (err, result) => {
      if (err) {
        res.send(false)
      } else {
        res.send(true)
      }
    });
});

app.post('/update', (req, res) => {


  let item = {
    add: req.body.add,
    superadmin: req.body.superadmin,
    delete: req.body.delete,
    edit: req.body.edit,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }

  let id = req.body._id;
  let updateUser = { $set: item };
  SignUpData.findByIdAndUpdate({ "_id": id }, updateUser)
    .then((respond) => {
      if (respond) {
        console.log('mongoDb updated successfully for Admin user')
        res.send(true)
      }
      else {
        console.log('mongoDb update error', error)
        res.send(false)
      }
    });
});

module.exports = app;