'use strict';
/** import third party modules */
import app from '../../../src/app';
import superagent from 'superagent';
import mongoose from 'mongoose';
describe('Simple Web Server', () => {
  var server;
  beforeAll( () => {
    server = app.start(8080);
  });
  afterAll( () => {
    /** drop employees collection created for test execution */
    mongoose.connection.db.dropCollection('employees',(err)=>{
      if(err) throw err;

      else{
        console.log('successfully dropped employees collection');
      }});

    /** close server port connection */
    server.close();
  });
  it('handles status code 200 for a post request to create employee record', () => {
    let obj = {'id':'123','name': `Joe`,'department':'Marketing','title':'Executive','location': 'WA-USA'};
    return superagent.post(`http://localhost:8080/api/v1/employees/`)
      .send(obj)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('Marketing'));
      });

  });
  it('handles status code 400 for a bad post request with empty object passed', () => {
    return superagent.post(`http://localhost:8080/api/v1/employees/`)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
      });
  });
  it('handles status code 200 for a put request to update existing employee record', () => {
    let obj = {'id':'32','name': `Sara`,'department':'HR','title':'SR.Manager','location': 'OR-USA'};
    let updatedObj = {'id':'32','name': `Sara`,'department':'HR','title':'Director','location': 'CA-USA'};
    return superagent.post(`http://localhost:8080/api/v1/employees/`)
      .send(obj)
      .then(response => {
        let postedRecord = JSON.parse(response.text);
        return superagent.put(`http://localhost:8080/api/v1/employees/${postedRecord._id}`)
          .send(updatedObj)
          .then(response => {
            let receivedContent = JSON.parse(response.text);
            expect(response.status).toEqual(200);
            expect(receivedContent.title).toEqual('Director');
          });
      });
  });
  it('handles status code 400 for a bad PUT request with empty object passed', () => {
    return superagent.put(`http://localhost:8080/api/v1/employees/322`)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
      });
  });
  it('handles status code 404 for a valid PUT request made with an id that was not found', () => {
    let updatedObj = {'id':'8787','name': `Jacob`,'department':'HR','title':'Director','location': 'CA-USA'};
    return superagent.put(`http://localhost:8080/api/v1/employees/8787`)
      .send(updatedObj)
      .catch(response => {
        expect(response.status).toEqual(404);
        expect(response.toString()).toEqual(expect.stringContaining('Not Found'));
      });
  });
  it('handles status code 200 for a get request for getting valid employee', () => {
    let obj = {'id':'927','name': 'Justin','department':'Finance','title':'Manager','location': 'TX-USA'};
    return superagent.post(`http://localhost:8080/api/v1/employees/`)
      .send(obj)
      .then(response => {
        let postedRecord = JSON.parse(response.text);
        return superagent.get(`http://localhost:8080/api/v1/employees/${postedRecord._id}`)
          .then(response => {
            let receivedContent = JSON.parse(response.text);
            expect(response.status).toEqual(200);
            expect(receivedContent.name).toEqual('Justin');
          });
      });
  });
  it('handles status code 400 for a bad get request made with an empty id passed', () => {
    return superagent.get(`http://localhost:8080/api/v1/employees/`)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
      });
  });
  it('handles status code 404 for a valid get request made with id that was not found', () => {
    let id = 2222;
    return superagent.get(`http://localhost:8080/api/v1/employees/${id}`)
      .catch(response => {
        expect(response.status).toEqual(404);
        expect(response.toString()).toEqual(expect.stringContaining('Not Found'));
      });
  });

  it('handles status code 200 for a delete request for employee that has valid id', () => {
    let obj = {'id':'655','name': 'Riya','department':'Payroll','title':'Engineer','location': 'NJ-USA'};
    return superagent.post(`http://localhost:8080/api/v1/employees/`)
      .send(obj)
      .then(response => {
        let postedRecord = JSON.parse(response.text);
        return superagent.delete(`http://localhost:8080/api/v1/employees/${postedRecord._id}`)
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.text).toEqual(expect.stringContaining('deleted'));
          });
      });
  });
  it('handles status code 404 for a valid delete request made with invalid id', () => {
    return superagent.delete(`http://localhost:8080/api/v1/employees/1111`)
      .catch(response => {
        expect(response.status).toEqual(404);
        expect(response.toString()).toEqual('Error: Not Found');
      });
  });
  it('handles status code 400 for a bad delete request when no id passed in', () => {
    return superagent.delete(`http://localhost:8080/api/v1/employees/`)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
      });
  });
  it('handles a 404 error for every unhandled route', () => {
    return superagent.delete(`http://localhost:8080/api/v1/`)
      .catch(response => {
        expect(response.status).toEqual(404);
        expect(response.toString()).toEqual('Error: Not Found');
      });
  });
});