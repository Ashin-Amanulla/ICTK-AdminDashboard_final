const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://userone:userone@cluster0.vcc0q.mongodb.net/ProjectICTKWebsite', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    course_title            : String,
    course_image            : String,
    course_short_desc       : String,
    Reg_Status              : Number,
    Category                : String,
    Rating                  : Number,
    about_course            : String,
    dates                   : String,
    eligibility             : String,
    course_fee              : String,
    entrance_details        : String,
    refund_policy           : String,
    course_delivery         : String,
    internship_partner      : String,
    knowledge_partner       : String,
    sponser_partner         : String,
    index                   : Number,
    active                  : Boolean 
});    

var Coursedata = mongoose.model('course',CourseSchema);

module.exports = Coursedata;