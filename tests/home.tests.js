const assert = require('assert');
const fetch = require('node-fetch');

suite('Home page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8888/");
    let body = await res.text();
    assert.match(body, /<h1>Students Registry<\/h1>/);
  });
  
  test('Students count', async function() {
    let res = await fetch("http://localhost:8888/");
    let body = await res.text();
    assert.match(body, /Registered students: <b>2<\/b>/);
  });
});
