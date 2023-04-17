const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    "development": {
        "username": process.env.DEV_MYSQL_USERNAME,
        "password": process.env.DEV_MYSQL_PASSWORD,
        "database": process.env.DEV_MYSQL_DATABASE,
        "host": process.env.DEV_MYSQL_HOST,
        "dialect": "mysql",
        "port": process.env.MYSQL_PORT
    }
}