const express =  require('express');
const app = express();
const cors =  require('cors');

const pool = require('./db');

app.use(cors());
app.use(express.json())


app.post('/todos', async(req ,res)=>{
    try{
        const {description} = req.body;
        
        const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES ($1)",
        [description]
        );
        res.json(newTodo);
    
  } catch (error) {
    console.log(error.message);
  }
})

app.get('/todo', async(req ,res)=>{
    try{
        const allTodo = await pool.query(
        "SELECT * FROM todo",
        );
        res.json(allTodo.rows);
    
  } catch (error) {
    console.log(error.message);
  }
})

app.get('/todos/:id', async(req ,res)=>{
    try{
        const {id} = req.params;
        const allTodo = await pool.query(
        "SELECT * FROM todo WHERE todo_id = $1",[id],
        );
        res.json(allTodo.rows);
    
  } catch (error) {
    console.log(error.message);
  }
})


app.put('/todos/:id', async(req ,res)=>{
    try{
        const {id} = req.params;
        const {description} = req.body;
        const allTodo = await pool.query(
        "UPDATE todo SET description = $1  WHERE todo_id =$2",[description,id],
        );
        res.json('updated');
    
  } catch (error) {
    console.log(error.message);
  }
})

app.delete('/todos/:id', async(req ,res)=>{
    try{
        const {id} = req.params;
        const allTodo = await pool.query(
        "DELETE FROM todo   WHERE todo_id =$1",[id],
        );
        res.json('deleted');
    
  } catch (error) {
    console.log(error.message);
  }
})

app.listen(3000,()=>{
    console.log('stated');
});