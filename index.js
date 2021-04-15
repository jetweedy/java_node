
/*
The following code completes a Node.js Express endpoint for 'getting' a list of people
stored in a data set. The rest of the code behind this application has been omitted 
because it is the intellectual property of Bryn Mawr (see README)
*/

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
