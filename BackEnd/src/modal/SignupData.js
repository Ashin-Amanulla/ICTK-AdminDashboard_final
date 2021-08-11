const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://userone:userone@cluster0.vcc0q.mongodb.net/ProjectICTKWebsite', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const SignUpSchema = new Schema({

  add: Boolean,
  superadmin: Boolean,
  delete: Boolean,
  edit: Boolean,
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  email: String

});

var SignUpData = mongoose.model('userdata', SignUpSchema);

module.exports = SignUpData;