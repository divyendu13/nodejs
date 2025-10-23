const http = require("http");
const express = require('express');
const app = express();
const port = 3000;

//middleware to parse JSON request bodies
app.use(express.json());

// In memory database

let users = [
    { id:1, name: 'Alice', email: 'alice@example.com'},
    { id: 2, name:'Bob', email: 'bob@example.com' }
]

let nextId = 3;




//1. Create (POST /users)
app.post('/users', (req,res) => {
   const {name, email} = req.body;

    if(!name || !email) {
        return res.status(400).json({ message: "Name and email are required." });
    }

    const newUser = {
        id: nextId++,
        name,
        email,
    }

    users.push(newUser);
    nextId++;
    res.status(201).json(newUser);

});

//2. Read ALL (GET /users)

app.get('/users', (req,res) =>{
    res.status(200).json(users);
});

// 3. Read one (GET /users/:id)

app.get('/users/:id' , (req,res) =>{
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if(user){
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found.' }); 
    }
});

//4. Update (PUT /users/:id)
app.put('/users/:id', (req,res)=> {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex ( u => u.id === id);

    if(userIndex !== -1) {
        users[userIndex] = {
            ...users[userIndex],
        name: req.body.name || users[userIndex].name,
        email: req.body.email || users[userIndex].email,
        };
        res.status(200).json(users[userIndex]);
    } else {
        res.status(404).json({message: "User not found."});
    }
});

// 5. Delete (DELETE /users/:id)

app.delete('/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex ( u => u.id === id);

    if(userIndex !== -1) {
        users.splice(userIndex,1)
        res.status(204).send();
    } else {
        res.status(404).json({message: "User not found."});
    }
});


// Export the app for testing
module.exports = app;

//Start the server if running directly (not for testing)
if (require.main === module ){
    app.listen(port,() => {
        console.log(`Server running on http://localhost:${port}`);
    })
}