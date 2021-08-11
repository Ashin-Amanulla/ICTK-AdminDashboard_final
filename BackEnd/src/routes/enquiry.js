const express = require('express');
let app = express.Router();
const jwt = require('jsonwebtoken');
const EnquiryData = require('../modal/enquiryForm');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');





var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: 'ictakKerala20k',
            pass: 'ICTKerala@2021'
    }
});



app.get('/EnquiryList', function (req, res) {
    EnquiryData.find().sort({ _id: -1 })
        .then(function (Enquires) {
            res.send(Enquires);
        });
});


app.post('/Enquiry/sendmail', (req, res) => {
    const to = req.body.to;
    const subject = req.body.subject;
    const text = req.body.text;
    const _id = req.body._id;
    const message = req.body.message;
    console.log(`update of ${_id} and mail to ${to}`);
    const mailData = {
        from: 'ictkerala707@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: message,
    };

    transporter.sendMail(mailData, function (error, info) {
        if (error) {
            console.log(error);
        }
    });
    console.log("mail is send");
    EnquiryData.findByIdAndUpdate({ "_id": _id }, { $set: { "responded": true } })
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

app.post('/Enquiry/sendmailWithAttachment',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');  
    // const destn = path.join(__dirname, '../', 'FrontEnd', 'src', 'assets', 'images');
    // console.log(destn);
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
          callback(null, destn);
        },
        filename: function(req, file, cb) {
          cb(null, file.originalname);
      }
      });
    var upload = multer({ dest: './uploads/'}).array('attachments',10);
    upload(req,res,function(err) {
  
        if(err) {
            console.log("Error uploading file.");
        }
    console.log("File is uploaded");
    const to = req.body.to;
    const subject = req.body.subject;
    const text = req.body.text;
    const _id = req.body._id;
    const message = req.body.message;
    console.log(`update of ${_id} and mail to ${to}`);
    var attachementList = [];
    console.log(req.files)
    for (var i = 0; i < req.files.length; i++) 
       {
         attachementList.push({filename: req.files[i].originalname,path: req.files[i].path})
       }
       console.log(attachementList);
    const mailData = {
        from: 'ictkerala707@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: message,
        attachments: attachementList
      };
  
    transporter.sendMail(mailData,function(error, info) {   
      if(error) {
        console.log(error);
      }
    });
    console.log("mail is send");
    EnquiryData.findByIdAndUpdate({"_id":_id},{$set:{"responded":true}})
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
  });  

app.get('/enquiry/:id', (req, res) => {

    const id = req.params.id;
    EnquiryData.findOne({ "_id": id })
        .then((staff) => {
            res.send(staff);
        });
})


module.exports = app;