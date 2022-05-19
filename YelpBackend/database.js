const knex = require("knex")({
	client: "mysql2",
	connection: {
		host: "sql11.freesqldatabase.com",
		database: "sql11493069",
		user: "sql11493069",
		password: "48WWNPbM3p",
		port: "3306"
	}
});

module.exports = knex;