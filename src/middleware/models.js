'use strict';

/**
 * Dynamically find and set the right model, based on the URL Param
 *    i.e.  /api/vi/people/12345 would result in the model being "people"
 *          assuming there is a valid "people.js" file in the models folder
 * @param req
 * @param res
 * @returns {*}
 */

// Read and require every file in the "models" directory
// This allows us to dynamically create and use models with ONE API.


// import requireAll from 'require-dir';
// const models = requireAll('../models');

//import employeeSchema from '../models/employees';
import Employee from '../models/employees';
const models = {'employees':{default:Employee}};

export default (req,res,next) => {
  try {
    let model = req && req.params && req.params.model;
    if ( model && models[model] && models[model].default ) {
      req.model = models[model].default;
      next();
    }
    else { throw 'Model not found'; }
  }
  catch(e) {
    throw e;
  }
};