'use strict';
import mongoose from 'mongoose';
require('dotenv').config();
let MONGODB_URI = 'mongodb://heroku_270zxqhk:6drl87pgjm2pv8968i9nhhmp90@ds015584.mlab.com:15584/heroku_270zxqhk';
mongoose.connect(MONGODB_URI);
const employeeSchema = mongoose.Schema({
  id: {type:String, required: true},
  name: {type: String, required: true},
  department: {type:String, default: 'Research'},
  title: {type: String, required: true},
  location: {type: String, default: 'US', uppercase: true},
});
const Employee = mongoose.model('employees', employeeSchema);
export default Employee;