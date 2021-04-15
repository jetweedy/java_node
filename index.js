var express = require('express');
var app = express();

// This is the definition of the Person class -- DO NOT CHANGE IT!
class Person {
    constructor(id, status) {
	this.id = id;
	this.status = status;
    }
}

// This is the map of IDs to Person objects -- DO NOT CHANGE IT!
var people = new Map();
people.set('1234', new Person('1234', 'safe'));
people.set('5678', new Person('5678', 'missing'));
people.set('1111', new Person('1111', 'safe'));
people.set('4321', new Person('4321', 'deceased'));
people.set('5555', new Person('5555', 'hospitalized'));
people.set('3530', new Person('3530', 'safe'));


// This is the '/test' endpoint that you can use to check that this works
// Do not change this, as you will want to use it to check the test code in Part 2
app.use('/test', (req, res) => {
	// create a JSON object
	var data = { 'message' : 'It works!' };
      	// send it back
	res.json(data);
    });


// This is the endpoint you need to implement in Part 1 of this assignment
app.use('/get', (req, res) => {

	let r = [];
	if (typeof req.query.id != "undefined") {
		if (Array.isArray(req.query.id)) {
			for (let i=0;i<req.query.id.length;i++) {
				let p = people.get(req.query.id[i]);
				if (p==null) {
					p = {"id":"0","status":"unknown"};
				}
				r.push(p);
			}
		} else {
			let p = people.get(req.query.id);
			if (p==null) {
				p = {"id":"0","status":"unknown"};
			}
			r.push(p);
		}
	} else {
		r.error = "No IDs provided.";
	}
	res.send(JSON.stringify(r));
	
});

// -------------------------------------------------------------------------
// DO NOT CHANGE ANYTHING BELOW HERE!

// This endpoint allows a caller to add data to the Map of Person objects
// You do not need to do anything with this code; it is only provided
// as an example but will also be used for grading your code
app.use('/set', (req, res) => {
	// read id and status from query parameters
	var id = req.query.id;
	var status = req.query.status;
	// create new Person object
	var person = new Person(id, status);
	// add it to Map
	people.set(id, person);
	// send it back to caller
	res.json(person);
    });

// This just sends back a message for any URL path not covered above
app.use('/', (req, res) => {
	res.send('Default message.');
    });

// This starts the web server on port 3000. 
app.listen(3000, () => {
	console.log('Listening on port 3000');
    });
