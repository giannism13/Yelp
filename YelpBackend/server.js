const { response } = require("express");
const express = require("express");
const res = require("express/lib/response");
const app = express();
const knex = require("./database");
const cors = require("cors");
app.use(express.json());
app.use(cors());

//endpoint for a future list of categories page
app.get("/categories", (req, res) => {
	const object = knex("businesses").select("categories").then((response) => {
		res.send(response);
	});
	console.log("GET categories request");
})

//endpoint for a future search function
//seach query must be passed as query parameter eg. /search/?q=rental
app.get("/search/", (req, res) => {
	var searchQ = req.query.q;

	const object = knex("businesses").select("name", "business_id", "stars", "longitude", "latitude", "review_count").
		whereILike("name", `%${searchQ}%`).then((response) => {
			res.send(response);
		})
	console.log("GET search request. Q= " + searchQ);
})

//endpoint for when you click on a business
//request should be at /business/some_business_id
app.get("/business/:id", (req, res) => {
	var businessID = req.params.id;
	let result = knex("businesses").where("business_id", businessID).first()
	result.then((response) => {
		console.log(response);
		res.send(response);
	})
	console.log("GET business request. id= " + businessID);
})

//image filename request endpoint
app.get("/imgFilenames/:business_id", (req, res) => {
	var businessID = req.params.business_id;
	var number = req.query.q;

	if (number == 1) {
		const object = knex("images").select("photo_id", "caption").
			whereILike("business_id", businessID).first().then((response) => {
				res.send(response);
			})
	}
	else {
		const object = knex("images").select("photo_id", "caption").
			whereILike("business_id", businessID).then((response) => {
				res.send(response);
			})
	}
	//console.log("GET photo request. Q= " + searchQ);
})

app.use('/images', express.static('images'))

app.listen(3001, () => {
	console.log("listening to port 3001...");
})

//returns all the cities for the selected state
app.get("/get_all_states", (req, res) => {
	const object = knex("businesses2").distinct("state").then((response) => {
		response.forEach(element => {
			delete element['c']
		});
		res.send(response);
	})
})


//returns all the cities for the selected state
app.get("/get_all_cities/:state", (req, res) => {
	var state = req.params.state
	const object = knex("businesses2").distinct("city").whereILike("state", state).
		then((response) => {
			response.forEach(element => {
				delete element['c']
			});
			res.send(response);
		})
})

//returns the number business for the selected city and state
app.get("/get_number_of_businesses/:state/:city", (req, res) => {
	var state = req.params.state
	var city = req.params.city

	const object = knex("businesses2").whereILike("state", state).andWhereILike("city", city).count().first().
		then((response) => {
			res.send(response);
		})
})

//returns the number of businesses for the selected state
app.get("/get_number_of_businesses/:state", (req, res) => {
	var state = req.params.state

	const object = knex("businesses2").whereILike("state", state).count().first().
		then((response) => {
			res.send(response);
		})
})


//returns the number of businesses in the selected state that have each value of an attribute
app.get("/statistics/:state/:attribute", (req, res) => {
	var state = req.params.state;
	var attribute = req.params.attribute;

	const object = knex("businesses2").select(attribute).count(attribute, { as: 'count' }).
		whereNot(attribute, "").whereILike("state", state).groupBy(attribute).then((response) => {
			res.send(response)
		})
})

//returns the number of businesses in the selected state and city that have each value of an attribute
app.get("/statistics/:state/:city/:attribute", (req, res) => {
	var state = req.params.state;
	var city = req.params.city;
	var attribute = req.params.attribute;

	const object = knex("businesses2").select(attribute).count(attribute, { as: 'count' }).whereNot(attribute, "").
		whereILike("state", state).andWhereILike("city", city).groupBy(attribute).then((response) => {
			res.send(response)
		})
})