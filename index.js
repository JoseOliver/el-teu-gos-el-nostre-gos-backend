const express = require('express');
const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config();

const db = require('./db/db.js');

const app = express();

const router = require('./router'); 

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = 3000;

db.then(() => {
    //Starting server
    app.listen(PORT, () => console.log("Server running on port " + PORT));
})
.catch((err) => console.log(err.message));  