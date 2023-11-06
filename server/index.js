const express = require("express")
const cors = require("cors")
const multer = require('multer');
const pool = require("./database")

const app = express()

app.use(express.json())
app.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, '../client/public/uploads/') // Files will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
      return cb(null, Date.now() + '-' + file.originalname) // Unique filename
    }
  });
  
const upload = multer({ storage: storage });
  
// Routes //

// register company
app.post("/adduser",  upload.single('file'), async(req,res)=>{
    try{
        const company_uen=req.body.uen;
        const company_name=req.body.name;
        const fileName = req.file.filename;

        const newTodo = await pool.query(
            "INSERT INTO users (company_uen,company_name,file_name) VALUES($1, $2, $3) RETURNING *",
            [company_uen,company_name,fileName]
        );
        res.json(newTodo.rows[0]);
        console.log(req.body);
    }
    catch(err){
        console.error(err.message);
    }
})

// get details of company by UEN 
app.get("/user/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM users WHERE company_uen = $1",[id]);

        res.json(todo.rows[0]);
    }
    catch(err){
        console.error(err.message)
    }
})

// get all companies
app.get("/users",async(req,res)=>{
    try{
        const allTodos = await pool.query("SELECT * FROM users");
        res.json(allTodos.rows);
    }
    catch(err){
        console.error(err.message)
    }
})

app.listen(5000,()=>console.log("Server on localhost:5000"));