const { response, query } = require("express");
const express = require("express");
const res = require("express/lib/response");
const app = express();
const knex = require("./database");
const cors = require("cors");
app.use(express.json());
app.use(cors());

//endpoint for a future list of categories page

app.get("/businesses", async (req, res) => {
	const { businessName, city, max = 1000, state, isOpen } = req.query;
	console.log({ businessName, city, state, max, isOpen });

	const maximum = Number.parseInt(max) || 100;
	res.json(
		await knex("businesses2")
			.select("*")
			.where((builder) => {
				if (businessName && businessName.length > 0) {
					builder.whereILike("name", `%${businessName}%`);
				}
				if (city && city.length > 0) builder.whereILike("city", `%${city}%`);
				if (state && state.length > 0)
					builder.whereILike("state", `%${state}%`);
				if (isOpen && isOpen !== "all")
					builder.whereILike("is_open", `%${Number.parseInt(isOpen)}%`);
			})
			.limit(maximum)
	);
});

app.get("/categories", (req, res) => {
	const object = knex("businesses2").select("categories").then((response) => {
		res.send(response);
	});
});

//endpoint for a future search function
//seach query must be passed as query parameter eg. /search/?q=rental
app.get("/search", (req, res) => {
	console.log(req.query);
	var searchQ = req.query.q;
	const object = knex("businesses2")
		.select("name", "business_id", "stars", "longitude", "latitude", "review_count", "categories", "Alcohol",
			"BikeParking",
			"NoiseLevel",
			"RestaurantsAttire",
			"RestaurantsPriceRange",
			"Smoking",
			"WiFi").whereILike("name", `%${searchQ}%`)
		.then((response) => {
			res.send(response);
		});
});

//endpoint for when you click on a business
//request should be at /business/some_business_id
app.get("/business/:id", (req, res) => {
	var businessID = req.params.id;
	let result = knex("businesses2").where("business_id", businessID).first();
	result.then((response) => {
		res.send(response);
	});
});

//image filename request endpoint
app.get("/imgFilenames/:business_id", (req, res) => {
	var businessID = req.params.business_id;
	var number = req.query.q;
	//console.log(req.params, req.query);

	if (number == 1) {
		const object = knex("images").select("photo_id", "caption").whereILike("business_id", businessID).first().then((response) => {
			res.send(response);
		});
	}
	else {
		const object = knex("images").select("photo_id", "caption").whereILike("business_id", businessID).then((response) => {
			res.send(response);
		});
	}
});

app.use("/images", express.static("images"));

app.listen(3001, () => {
	console.log("listening to port 3001...");
});

//returns all states
app.get("/get_all_states", (req, res) => {
	const object = knex("businesses2").distinct("state").orderBy("state", "asc").then((response) => {
		res.send(response.map((result) => result.state));
	});
});

//returns all cities for the selected state
app.get("/get_all_cities/:state", (req, res) => {
	var state = req.params.state;
	if (state !== "None") {
		const object = knex("businesses2").distinct("city").whereILike("state", state).orderBy("city", "asc").then((response) => {
			res.send(response.map((result) => result.city));
		});
	}
	else {
		const object = knex("businesses2").distinct("city").orderBy("city", "asc").then((response) => {
			res.send(response.map((result) => result.city));
		});
	}
});

//returns the number business for the selected city and state
app.get("/get_number_of_businesses/:state/:city", (req, res) => {
	var state = req.params.state;
	var city = req.params.city;

	const object = knex("businesses2").whereILike("state", state).andWhereILike("city", city).count().first().then((response) => {
		res.send(response);
	});
});

//returns the number of businesses2 for the selected state
app.get("/get_number_of_businesses/:state", (req, res) => {
	var state = req.params.state;

	const object = knex("businesses2").whereILike("state", state).count().first().then((response) => {
		res.send(response);
	});
});

//returns the number of businesses2 that have each value of an attribute
app.get("/statistics/:attribute", (req, res) => {
	var attribute = req.params.attribute;

	const object = knex("businesses2").select(attribute)
		.count(attribute, { as: "count" }).whereNot(attribute, "").groupBy(attribute).then((response) => {
			res.send(response);
		});
});

//returns the number of businesses2 in the selected state that have each value of an attribute
app.get("/statistics/:state/:attribute", (req, res) => {
	var state = req.params.state;
	var attribute = req.params.attribute;

	const object = knex("businesses2")
		.select(attribute).count(attribute, { as: "count" })
		.whereNot(attribute, "").whereILike("state", state).groupBy(attribute).then((response) => {
			res.send(response);
		});
});

//returns the number of businesses2 in the selected state and city that have each value of an attribute
app.get("/statistics/:state/:city/:attribute", (req, res) => {
	var state = req.params.state;
	var city = req.params.city;
	var attribute = req.params.attribute;

	const object = knex("businesses2").select(attribute).count(attribute, { as: "count" })
		.whereNot(attribute, "").whereILike("state", state).andWhereILike("city", city).groupBy(attribute).then((response) => {
			res.send(response);
		});
});

//returns the coordinates of all the businesses2 that have this attribute
app.get("/heatmap/:attribute/:attributeValue", (req, res) => {
	var attribute = req.params.attribute;
	var attributeValue = req.params.attributeValue;

	const object = knex("businesses2").select("latitude", "longitude").where(attribute, attributeValue).then((response) => {
		res.send(response);
	});
});

//returns all the possible values for the selected attribute
app.get("/get-all-values/:attribute", (req, res) => {
	var attribute = req.params.attribute;

	const object = knex("businesses2").distinct(attribute).whereNot(attribute, "").orderBy(attribute, "asc").then((response) => {
		res.send(response.map((result) => result[attribute]));
	});
});

//makes a search query with the set city, state, attribute and attribute value
app.get("/searchExt/", (req, res) => {
	var state = req.query.state;
	var city = req.query.city;
	var attribute = req.query.attribute;
	var attributeValue = req.query.attributeValue;

	if (state === "None") {
		const object = knex("businesses2").select("name", "business_id", "stars", "longitude", "latitude", "review_count")
			.where(attribute, attributeValue).then((response) => {
				res.send(response);
			});
	}
	else if (city === "None") {
		const object = knex("businesses2")
			.select("name", "business_id", "stars", "longitude", "latitude", "review_count")
			.where(attribute, attributeValue).andWhereILike("state", state).then((response) => {
				res.send(response);
			});
	}
	else {
		const object = knex("businesses2")
			.select("name", "business_id", "stars", "longitude", "latitude", "review_count")
			.where(attribute, attributeValue).andWhereILike("state", state).andWhereILike("city", city).then((response) => {
				res.send(response);
			});
	}
});

app.get("/avgScore/", (req, res) => {
	var state = req.query.state;
	const object = knex("businesses2").select("stars", "city").where("state", state).then((response) => {
		res.send(response);
	});
});

app.get("/")
