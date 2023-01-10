const express = require('express'); 
const path = require("path")
const app = express();
const PORT = 3001;
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('./helper/fsUtils');
  

app.use(express.static('public')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
res.sendFile(path.join(__dirname,'/index.html'));

})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})
app.get("/api/notes",(req, res )=>{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));  
})
app.post("/api/notes",(req,res)=>{
console.log (req.body)
const {title,text}=req.body
const newNote = {
    title,
    text
  };

  readAndAppend(newNote, './db/db.json');
  res.json(`Tip added successfully 🚀`);
})
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
