const express = require('express');
let app = express.Router();
const path = require('path');
const StaffData = require('../modal/Staffdata');







//staff update with image

app.post('/staff/updateWithFile', (req, res) => {

    console.log(` inside updateWithFile ${req.body}`)
    const destn = path.join(__dirname, '../', 'Admin-Dashboard-master', 'src', 'assets', 'images');
    console.log(destn);
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, destn);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {

        if (err) {
            console.log("Error uploading file.");
        }
        console.log("File is uploaded");
        // console.log(`the title is ${req.body.title}`);
        console.log(` inside update with image ${req.body.name}`);
        id = req.body._id,
            name = req.body.name,
            designation = req.body.designation,
            about = req.body.about,
            image = req.body.image
        StaffData.findByIdAndUpdate({ "_id": id },
            {
                $set: {
                    "name": name,
                    "designation": designation,
                    "about": about,
                    "image": image
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
    });


});



// });

//udating index
app.put('/Staffs/updateIndex', (req, res) => {


    id = req.body._id;
    title = req.body.name;
    index = req.body.index;
    console.log(`update of ${title} with value ${index}`);
    StaffData.findByIdAndUpdate({ "_id": id },
        { $set: { "index": index } })
        .then(function () {
            res.send();
        })

});



app.post('/Staff/insert', function (req, res) {

    var staff = {
        name: req.body.name,
        designation: req.body.designation,
        about: req.body.about,
        image: req.body.image,

    }
    var staffItem = new StaffData(staff);
    staffItem.save().then(function (data) {
        res.send(true)
    }).catch(function (error) {
        res.send(false)
    });

});






app.get('/staff/:id', (req, res) => {

    const id = req.params.id;
    StaffData.findOne({ "_id": id })
        .then((staff) => {
            res.send(staff);
        });
})


//getting staff data
app.get('/staffs', function (req, res) {
    StaffData.find().sort({ index: 1 })
        .then(function (staffs) {
            res.send(staffs);
        });
});


//deleting staff data
app.post('/Staff/remove', (req, res) => {
    console.log(req.body);
    id = req.body._id
    console.log(` inside remove ${id}`);
    StaffData.deleteOne({ '_id': id })
        .then(function (staff) {
            console.log('success')
            res.send(true);
        });

});
///updating staff 
app.post('/staff/update', (req, res) => {

    var item = {
        name: req.body.name,
        designation: req.body.designation,
        about: req.body.about,
        image: req.body.image
    }

    let id = req.body._id;
    let updateT = { $set: item };


    StaffData.findByIdAndUpdate({ _id: id }, updateT)
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




module.exports = app;