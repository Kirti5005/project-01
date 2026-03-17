const express = require ('express');
const users = require('./MOCK_DATA.json');
const fs = require("fs");
  
const app = express();
const PORT = 8000;
//middleware-plugging 
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    console.log("hello from middleware 1");
    next();
    
});
app.use((req, res, next) => {
    console.log("hello from middleware 2");
    return res.end("hey");
    
    
}); 
//routes
app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`) .join("")}
    </ul>
    `;
    res.send(html);
    console.log(html)
});
//rest api 
app.get('/api/users', (req, res) => {
    res.setHeader("myname", "kirti");
    return res.json(users);
});
app 
   .route("/api/users/:id")
   .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
    })
    .patch((req, res) => {
        //edit the user with ID 1
        return res.json({status: "pending"});
    })
    .delete((req, res) => {
        //delete the user with ID 1
        return res.json({status: "pending"});
    });

app.post ('/api/users', (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.json({status: "success", id: users.length });
    });
    
    });


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)
);
