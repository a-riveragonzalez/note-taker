const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

// *********************IN EVERY SERVER IN THIS ORDER***********************//
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// we will be using the public directory
app.use(express.static('public'));

// -------------------------------------------------------------------------//

// ****************** HTML Routes ********************//
// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page when button is pushed
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// **************** API Routes *****************//

// api notes gets the json from the body
app.get('/api/notes', (req, res) =>
  res.json(db.slice(1))
);

// takes the notes from json and adds the users input note to the origin json db
app.post('/api/notes', (req, res) => {
    // this is the user's note
    const newNote = req.body;

    console.log(createNote(newNote, db));

    // todo needs a res (in the form of a json)
});

// function for creating a note. Having an array where it gets posts to 
// body = body of the json that comes from the front end note input
// dataBaseArray is the db json array 

const createNote = (body, dbArray) => {
    const newNote = body;
    // todo comment on what this means 
    dbArray = [];

    dbArray.push(newNote);
    console.log(dbArray)


    // todo fs something 
    
    // todo return something 
}

//************** App listening **************//
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


