// ********************* Reference Variables ***********************//
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

// ********************* IN EVERY SERVER IN THIS ORDER ***********************//
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
    res.json(db)
);

// takes the notes from json and adds the users input note to the origin json db
app.post('/api/notes', (req, res) => {
    // this is the user's note
    const newNote = req.body;
    createNote(newNote)
    res.json(newNote)
});

// function for creating a note
const createNote = (body) => {
    const newNote = body;
    console.log(newNote)
    // ? could i use db variable instead of reading it?

    // Read, parse, update(push), stringify, save 
    // read database and add new note to it 
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (error, storednotes) => {
        if (error) {
            console.error(error)
        } else {
            const storedNotes = JSON.parse(storednotes);
            // console.log(storedNotes);

            storedNotes.push(newNote);

            // gives each note a unique id
            storedNotes.forEach(note => {
                note.id = uuidv4();
            });

            fs.writeFileSync(
                path.join(__dirname, "/db/db.json"), 
                JSON.stringify(storedNotes)), (err) => 
                    err ? console.log(err) : console.log("Note has been added")
        }
    })

    return newNote
}

// removes the notes from json 
app.delete('/api/notes/:id', (req, res) => {
    deleteid(req.params.id);

    // ? why does returing this work?
    res.json(db)
})

const deleteid = (id) => {
    console.log(id)

    // ? could i use db variable instead of reading it?

    // Read, parse, update(delete), stringify, save 
    // read database and delete note in it 
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (error, storednotes) => {
        if (error) {
            console.error(error)
        } else {
            const storedNotes = JSON.parse(storednotes);
            // console.log(storedNotes);

            for (let i = 0; i<storedNotes.length; i++){
                if (storedNotes[i].id == id){
                    storedNotes.splice(i, 1)
                }
            }

            fs.writeFileSync(
                path.join(__dirname, "/db/db.json"), 
                JSON.stringify(storedNotes)), (err) => 
                    err ? console.log(err) : console.log("Note has been deleted")
        }
    })
}

// GET Route for homepage - to catch any other extensions
app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//************** App listening **************//
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


