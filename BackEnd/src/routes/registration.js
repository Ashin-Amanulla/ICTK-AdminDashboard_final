const express = require('express');
let app = express.Router();
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');


const CourseRegistrationdata = require('../modal/CourseRegistrationData');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: 'ictakKerala20k',
            pass: 'ICTKerala@2021'
    }
});



app.post('/registercourse', function (req, res) {
    var RegistrationItem = {
        course_id: req.body.course_id,
        course_title: req.body.course_title,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        emailaddress: req.body.emailaddress,
        phoneno: req.body.phoneno,
        employed: req.body.employed,
        graduation: req.body.graduation,
        message: req.body.message
    }

    CourseRegistrationdata.find({ 'emailaddress': RegistrationItem.emailaddress, 'course_id': RegistrationItem.course_id })
        .then(function (cousrseReg) {
            var bexist = false;
            console.log(`fetched from db Email ID - ${RegistrationItem.emailaddress}, coursetitle - ${RegistrationItem.course_title}`)
            for (var i = 0; i < cousrseReg.length; i++) {
                if ((cousrseReg[i].emailaddress == RegistrationItem.emailaddress) && (cousrseReg[i].course_id == RegistrationItem.course_id)) {
                    bexist = true;
                }
            };
            if (bexist) {
                console.log(`Email ID is already registered for the course ${RegistrationItem.course_title}`);
                res.status(401).send(`Email ID is already registered for the course ${RegistrationItem.course_title}`)
            }
            else {
                var vUser = CourseRegistrationdata(RegistrationItem);
                vUser.save();
                const to = RegistrationItem.emailaddress;
                const subject = `${RegistrationItem.course_title} broucher link to download` ;
                const text = 'text';
                const message = `<p>Dear ${RegistrationItem.firstname},</p><p>Thank you for expressing your intrest in our course!!!!!!</p>
                <p>Please click <a  href='https://firebasestorage.googleapis.com/v0/b/angular-firebase-b9d8c.appspot.com/o/FSD-MEAN-brochureKKEM_compressed.pdf?alt=media&token=3f9c78a5-b249-4585-986b-692f17279da9' target="_blank">here</a> to download the brochure.</p>
                <p>Regards,</p>
                <p>ICTAK Team.</p>`;
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
                console.log(`The registered user added is : Email ID - ${RegistrationItem.emailaddress}, Course - ${RegistrationItem.course_title}`);
                res.status(200).send({ RegistrationItem })
            }
        });
});

app.get('/registercourseList', function (req, res) {
    console.log('registercourseList')
    CourseRegistrationdata.find().sort({ _id: -1 })
        .then(function (cousrseRegs) {
            res.send(cousrseRegs);
        });
});

app.get('/registercourseAggr',function(req,res){
    console.log('registercourseAggr')
    let date_ob = new Date();  
    date_ob.setMonth(date_ob.getMonth()-4);
    console.log(date_ob)
    CourseRegistrationdata.aggregate([
      {
        $match: {
          creation_date: {
            $gte: date_ob
          }
        }
      },
      {
          $group:
          {
              _id: { course_title: "$course_title" },
              totalCourseRegstrn: { $sum: 1 }
          }
      }
  ])
    .then(function(cousrseRegs){
        res.send(cousrseRegs);
        });
  });

module.exports = app;