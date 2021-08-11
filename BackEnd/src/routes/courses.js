const express = require('express');
let app = express.Router();
const multer = require('multer');
const path = require('path');


const Coursedata = require('../modal/CourseData');






app.get('/CourseList', function (req, res) {
    Coursedata.find().sort({ index: 1 })
        .then(function (courses) {
            res.send(courses);
        });
});

app.get('/Course/:id', (req, res) => {
    const id = req.params.id;
    Coursedata.findOne({ "_id": id })
        .then((course) => {
            res.send(course);
        });
})

app.get('/CourseTestimony/:id', (req, res) => {
    const id = req.params.id;
    Testimonialdata.find({ "course_id": id })
        .then((testimonials) => {
            res.send(testimonials);
        });
})


app.get('/CourseCategory', function (req, res) {
    Coursedata.find().sort({ Reg_Status: -1 })
        .then(function (courses) {
            res.send(courses);
        });
});

app.post('/Course/insert', function (req, res) {

    var indx;

    Coursedata.findOne().sort('-index').exec(function (err, course) {
        indx = course.index;
        indx = indx + 1;

        var course = {
            course_title: req.body.course_title,
            course_image: req.body.course_image,
            course_short_desc: req.body.course_short_desc,
            Reg_Status: req.body.Reg_Status,
            Category: req.body.Category,
            Rating: req.body.Rating,
            about_course: req.body.about_course,
            dates: req.body.dates,
            eligibility: req.body.eligibility,
            course_fee: req.body.course_fee,
            entrance_details: req.body.entrance_details,
            refund_policy: req.body.refund_policy,
            course_delivery: req.body.course_delivery,
            internship_partner: req.body.internship_partner,
            knowledge_partner: req.body.knowledge_partner,
            sponser_partner: req.body.sponser_partner,
            index: indx,
            active: req.body.active
        }

        var courseItem = new Coursedata(course);
        courseItem.save().then(function (data) {
            res.send(true)
        }).catch(function (error) {
            res.send(false)

        });

        Coursedata.findOne({ 'course_title': course.course_title }).select("_id").lean().then(result => {
            if (result) {
                Coursedata.findByIdAndDelete(result).then(function (data) {
                }).catch(function (error) {
                });
            }
        });

    });







});


app.post('/Course/remove', (req, res) => {
    console.log(req.body);
    id = req.body._id
    console.log(` inside remove ${id}`);
    Coursedata.findByIdAndDelete({ '_id': id },
        (err, result) => {
            if (err) {
                res.send(false)
            } else {
                res.send(true)
            }
        });
});


app.post('/Course/update', (req, res) => {

    id = req.body._id;
    let item = {
        course_title: req.body.course_title,
        course_image: req.body.course_image,
        course_short_desc: req.body.course_short_desc,
        Reg_Status: req.body.Reg_Status,
        Category: req.body.Category,
        Rating: req.body.Rating,
        about_course: req.body.about_course,
        dates: req.body.dates,
        eligibility: req.body.eligibility,
        course_fee: req.body.course_fee,
        entrance_details: req.body.entrance_details,
        refund_policy: req.body.refund_policy,
        active: req.body.active
    }

    let updateCourse = { $set: item };
    Coursedata.findByIdAndUpdate({ "_id": id }, updateCourse)
        .then((respond) => {
            if (respond) {
                res.send(true)
            }
            else {
                res.send(false)
            }
        });
});




app.put('/Course/updateIndex', (req, res) => {

    id = req.body._id;
    title = req.body.course_title;
    index = req.body.index;
    console.log(`update of ${title} with value ${index}`);
    Coursedata.findByIdAndUpdate({ "_id": id }, { $set: { "index": index } })
        .then(function () {
            res.send();
        })

});

app.put('/Course/updateStaffIndex', (req, res) => {

    id = req.body._id;
    index = req.body.index;
    name = req.body.name;
    console.log(`update of ${name}  with value ${index}`);
    Coursedata.findByIdAndUpdate({ "_id": id },
        { $set: { "index": index } })
        .then(function () {
            res.send();
        })

});



module.exports = app;