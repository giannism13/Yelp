const knex = require("knex")({
	client: "mysql2",
	connection: {
		host: "localhost",
		database: "yelp",
		user: "root",
		password: "13334921",
		port: "3306"
	}
});

module.exports = knex;