const { response } = require("express");
const express = require("express");
const res = require("express/lib/response");
const app = express();
const knex = require("./database");
app.use(express.json());

//Endpoint for the home page
app.get("/", (req, res) => {
	res.end("homepage.html with a search box");
})

//endpoint for a future list of categories page
app.get("/categories", (req, res) => {
	const object = knex("businesses").select("categories").then((response) => {
		res.send(response);
	});
})

//endpoint for a future search function
//seach query must be passed as query parameter eg. /search/?q=rental
app.get("/search/", (req, res) => {
	var searchQ = req.query.q;

	const object = knex("businesses").select("name", "business_id", "stars", "longitude", "latitude", "review_count").
		whereILike("name", "%" + searchQ + "%").then((response) => {
		res.send(response);
	})
})

//endpoint for when you click on a business
//request should be at /business/some_business_id
app.get("/business/:id", (req, res) => {
	var businessID = req.params.id;

	let result = knex("businesses").where("business_id", businessID)
	const object = result.then((response) => {
		res.send(response);
	})
	//res.json(result);
})

app.listen(3001, () => {
	console.log("listening to port 3001...");
})