'use strict';
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/');
const employeeSchema = mongoose.Schema({
  id: {type:String, required: true},
  name: {type: String, required: true},
  department: {type:String, default: 'Research'},
  title: {type: String, required: true},
  location: {type: String, default: 'US', uppercase: true},
});
const Employee = mongoose.model('employees', employeeSchema);
export default Employee;