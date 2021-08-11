const express = require('express');
let app = express.Router();
const jwt = require('jsonwebtoken');

const PartnershipApplicationdata = require('../modal/newpartnerForm');
const CorporateApplicationdata = require ('../modal/newcorporateForm')




app.get('/partnershipapplicationList', function (req, res) {
  PartnershipApplicationdata.find().sort({ _id: -1 })
    .then(function (partnershipapplication) {
      res.send(partnershipapplication);
    });
});

app.get('/CorporateapplicationList', function (req, res) {
  CorporateApplicationdata.find().sort({ _id: -1 })
    .then(function (corporateapplication) {
      res.send(corporateapplication);
    });
});



module.exports = app;