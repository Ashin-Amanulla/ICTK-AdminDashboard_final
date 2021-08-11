const express = require('express');
let app = express.Router();
const jwt = require('jsonwebtoken');

const SignUpData = require('../modal/SignupData');







app.post('/', function (req, res) {

    let email = req.body.email;
    let password = req.body.password;

    // mongo check for user
    SignUpData.findOne({ email: email, password: password }, function (err, user) {
        if (err) {
            console.log("admin login failed")

            res.send({ status: false, data: 'Response error. No Internet' });
        }
        else if (user) {

            SignUpData.findOne({ email: req.body.email })
                .then(function (userdata) {
                    var user = userdata;
                });


            console.log("local user login success")
            let payload = { subject: email + password }
            let token = jwt.sign(payload, 'secretKey')
            res.send({ status: true, token, user })

            console.log({ status: true, token, user })
        } else {
            res.send({ status: false, data: 'NOT FOUND' });
        }
    });
});


app.post('/change-pass', function (req, res) {

    let old = req.body.oldpassword;
    let newpassword = req.body.newpassword;
    let email2 = req.body.email;
    console.log("pass", req.body)

    // mongo check for user
    SignUpData.findOne({ email: email2, password: old }, function (err, user) {
        if (err) {
            console.log("incorrect old password")

            res.send({ status: false, data: 'Incorrect credentials' });
        }
        else if (user) {
            console.log("correct credentials")
            SignUpData.findOne({ email: req.body.email })
                .then(function (userdata) {
                    var user = userdata;
                });

            SignUpData.findByIdAndUpdate({_id: user._id},
                {
                    $set: {
                        "password": newpassword,

                    }
                })
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
        }
    });
})



module.exports = app;