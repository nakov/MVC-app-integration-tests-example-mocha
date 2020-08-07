const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.use(require('body-parser')
  .urlencoded({extended:true}));

const studentsController = 
  require("./controllers/students-controller");

let students = require("./models/students-model");

studentsController.setup(app, students);

app.listen(8080)
.on('error', function(err) {
  if (err.errno === 'EADDRINUSE')
     console.error("Port 8080 busy (server already started).");
  else 
    throw err;
});
