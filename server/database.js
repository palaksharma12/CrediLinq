const {response} = require("express")
const {Pool} = require("pg")

const pool = new Pool({
    user:"postgres",
    password: "123",
    host: "localhost",
    port: 5432,
    database: "credlinq"
})

pool.connect();
pool.query(`Select * from users`,(err,res)=>{
    if(!err){
        console.log(res.rows);
    }
    else{
        console.log(err.message);
    }
})

module.exports = pool;