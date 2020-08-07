function setup(app, students) {
  app.get('/', function(req, res) {
    let model = {
      title: "MVC Example",
      msg: "Students Registry",
      students: students
    };
    res.render('home', model);
  });

  app.get('/students', function(req, res) {
    let model = {title: "Students", students};
    res.render('students', model);
  });

  app.get('/add-student', function(req, res) {
    let model = {title: "Add Student"};
    res.render('add-student', model);
  });

  app.post('/add-student', function(req, res) {
    let student = {
      name: req.body.name,
      email: req.body.email
    };
    students.push(student);
    res.redirect('/students');
  });
}

module.exports = { setup };
