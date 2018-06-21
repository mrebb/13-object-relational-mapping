![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 13: Single Resource Mongo and Express API
===

<img src="https://travis-ci.com/mrebb/13-object-relational-mapping.svg?branch=madhu">

## TRAVIS: https://travis-ci.com/mrebb/13-object-relational-mapping

## HEROKU: https://express-middleware.herokuapp.com 

## Single Resource Mongo and Express API

## /api/v1/employees

* POST request: passes data as stringifed JSON in the body of a post request to create a new resource
* GET request : /api/v1/employees/:id  passes the id of a resource through the url endpoint to get a resource. this uses req.params.
* PUT request: passes data as stringifed JSON in the body of a put request to overwrite a pre-existing resource
* DELETE request: passes the id of a resource though the url endpoint to delete a resource using req.params

* Handles GET, POST, PUT, DELETE methods for any model that is added to existing models directory
* GET handles 'api/v1/employees' when queryString has valid or empty ID
* POST handles 'api/v1/employees' with request body passed . 
* DELETE handles 'api/v1/employees' when queryString has valid or empty ID 
* Errors are handled when there is a bad request

## Tests
* Test for api that returns a status code of 404 for routes that have not been registered
* `GET`: test for 404: Responds with 'not found' for valid requests made with an id that was not found
* `GET`: test for 400: Respond with 'bad request' if no id was provided in the request
* `GET`: test for 200: Responds with response body for a request made with a valid id
* `POST`: test for 400: Responds with 'bad request' if no request body was provided or the body was invalid
* `POST`: test for 200: Responds with the body content for a post request with a valid body
* `PUT`: test for 200: Responds with the body content for a put request for existing record with a valid body
* `PUT`: test for 404: Responds with 'not found' for valid requests made with an id that was not found
* `PUT`: test for 400: Respond with 'bad request' if no body was provided in the request
* `DELETE`: test for 404: Respond with 'bad request' if no id was provided in the request
* `DELETE`: test for 200: Responds with provided id for a request made with a valid id
* `404`: page not found for all other routes that are not handled by API.