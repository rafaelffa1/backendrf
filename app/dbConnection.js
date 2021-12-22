const knex = require("knex");
const path = require("path");

const dbConnection = knex({
    client: "sqlite3",
    connection: {
        filename: path.resolve(__dirname, "db/sample.db"),
    },
    useNullAsDefault: true,
});

module.exports = dbConnection;