const dotenv = require('dotenv');
dotenv.config();
const {Sequelize, DataTypes} = require('sequelize');
let sequelize;
switch(process.env.ENVIRONMENT){
    case 'development':
        sequelize = new Sequelize(
            process.env.DEV_MYSQL_DATABASE, 
            process.env.DEV_MYSQL_USERNAME, 
            process.env.DEV_MYSQL_PASSWORD,
            {
                host: process.env.DEV_MYSQL_HOST,
                port: process.env.DEV_MYSQL_PORT,
                dialect: 'mysql',
                operatorAliases: false,
                pool: {
                    max: 5,  //maximum number of connection in pool
                    min: 0,  //minimum number of connection in pool
                    acquire: 30000, //maximum time, in milliseconds, that a connection can be idle before being released
                    idle: 10000 // maximum time, in milliseconds, that pool will try to get connection before throwing error
                },
            }
        );
    break;
    case 'testing':
        console.log(process.env.ENVIRONMENT + ' is not developed yet, please await future versions');
        process.exit(0);
    break;
    case 'production':
        console.log(process.env.ENVIRONMENT + ' is not developed yet, please await future versions');
        process.exit(0);
    break;
    default:
        console.log('defined environment ' + process.env.ENVIRONMENT + ' is not a correct value, redefine it before starting');
        process.exit(1);
}
//Sync database
// sequelize.sync({ force: true })
// .then(()=>{
//     console.log("All models were synchronized successfully.");
// });

module.exports = sequelize.authenticate()
.then((db)=>{
    console.log('Connection has been established successfully.'); 
    return db;
});