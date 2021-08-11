const express = require('express');
let app = express.Router();
const multer = require('multer');
const path = require('path');


const Testimonialdata = require('../modal/TestimonialData');


app.post('/testimonial/remove', (req, res) => {
    console.log(req.body);
    id = req.body._id
    console.log(` inside remove ${id}`);
    Testimonialdata.findByIdAndDelete({ '_id': id },
        (err, result) => {
            if (err) {
                res.send(false)
            } else {
                res.send(true)
            }
        });
});


app.get('/', function (req, res) {

    Testimonialdata.find().sort({ index: 1 })
        .then(function (testimonials) {
            res.send(testimonials);
        });
});

app.post('/testimonial/update', (req, res) => {

    var item = {
        name : req.body.name,
        position : req.body.position,
        organisation : req.body.organisation,
        testimonial : req.body.testimonial,
        course_title : req.body.course_title,
        image : req.body.image
    }

    let _id = req.body._id;
    let updateT = { $set: item };

    Testimonialdata.findByIdAndUpdate({ _id: _id }, updateT)
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


app.get('/testimonial/:id', (req, res) => {
    const id = req.params.id;

    Testimonialdata.findOne({ "_id": id })
        .then((testimonial) => {
            res.send(testimonial);
        });
})

app.put('/Testimonials/updateIndex', (req, res) => {

    id = req.body._id;
    title = req.body.name;
    index = req.body.index;
    console.log(`update of ${title} with value ${index}`);
    Testimonialdata.findByIdAndUpdate({ "_id": id },
        { $set: { "index": index } })
        .then(function () {
            res.send();
        })

});

app.post('/testimony/insert', function (req, res) {



    var testimonial = {

        name: req.body.name,
        position: req.body.position,
        organisation: req.body.organisation,
        testimonial: req.body.testimonial,
        course_title: req.body.course_title,
        image: req.body.image,
    }

    var testimonial = new Testimonialdata(testimonial);
    testimonial.save().then(function (data) {
        res.send(true)
    }).catch(function (error) {
        res.send(false)
    });
});




module.exports = app;