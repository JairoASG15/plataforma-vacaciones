const { Pool } = require("pg");


const pool = new Pool({


    host:"localhost",


    user:"postgres",


    password:"jairo123",


    database:"vacaciones_db",


    port:5432


});




module.exports = pool;
