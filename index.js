const express = require("express");
const app = express();

const port = 3001;
app.get("/",(req,res)=> {
    res.json({massage : "This is home page"});
});

app.get("/users",(req,res)=> {
    res.json({massage : "Get all the users"});
});

app.get("/users/:id",(req,res)=> {
    res.json({massage : `get user with  id ${req.params.id}`});
});

app.post("/users/",(req,res)=> {
    res.json({massage : `Create new user ${req.params.id}`});
});

app.put("/users/:id",(req,res)=> {
   res.json({massage : `Update user with  id${req.params.id}`});
});

app.delete("/users/:id",(req,res)=> {
   res.json({massage : `Delete user with  id${req.params.id}`});
});

app.listen(port, () => {
    console.log(`Example app lisitening on port ${port}`);
})