const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@cluster0.vcc0q.mongodb.net/ProjectICTKWebsite', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//Schema definition
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    name:String,
    designation:String,
    about:String,
    image: String,
    index:Number
    
});

//Model creation
var Staffdata = mongoose.model('staffdata',StaffSchema);

module.exports = Staffdata;