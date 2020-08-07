const assert = require('assert');
const fetch = require('node-fetch');

suite('Add Students page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8888/add-student");
    let body = await res.text();
    assert.match(body, /<h1>Register New Student Bug!<\/h1>/);
  });

  test('Students HTML form', async function() {
    let res = await fetch("http://localhost:8888/add-student");
    let body = await res.text();
    
    let nameFieldFound = body.includes('<input id="name" type="text" name="name"/>');
    assert.equal(nameFieldFound, true, "Field 'name' is missing");

    let emailFieldFound = body.includes('<input id="email" type="email" name="email"/>');
    assert.equal(emailFieldFound, true, "Field 'email' is missing");

    let buttonAddFound = body.includes('<button type="submit">Add</button>');
    assert.equal(buttonAddFound, true, "Button [Add] is missing");
  });

  test('Add valid student', async function() {
    let res = await fetch(
      "http://localhost:8888/add-student",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=Peter&email=peter%40gmail.com"
      }
    );
    let body = await res.text();
    let studentsReturned = body.includes("<ul><li>Steve (steve@gmail.com)</li><li>Tina (tina@yahoo.com)</li><li>Peter (peter@gmail.com)</li></ul>");
    assert.equal(studentsReturned, true, "Add student failed");
  });

  test('Add invalid student', async function() {
     let res = await fetch(
      "http://localhost:8888/add-student",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=Kate&email="
      }
    );
    let body = await res.text();
    let errMsg = body.includes("Cannot add student. Name and email fields are required!");
    assert.equal(errMsg, true, "Add invalid student should display an error message");

    res = await fetch("http://localhost:8888/");
    body = await res.text();
    assert.match(body, /Registered students: <b>2<\/b>/, "Add invalid student should not change the students count");
  });
});
