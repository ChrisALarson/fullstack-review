const express = require('express');
const db = require('../database/index');
const github = require('../helpers/github');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos/:username', function (req, res) {
  let username = req.params.username;
  console.log(`Serving POST /repos/${username}`);
  github.getReposByUsername(username, (error, response) => {
    if (error) return console.log(error);
    let data = JSON.parse(response);
    let repos = data.items;
    db.save(repos, (error) => {
      if (error) return console.log(err);
    });
    res.status(201).json({ reposSubmitted: repos.length });
  });
});


app.get('/repos', function (req, res) {
  console.log('Serving GET /repos');
  db.retrieve((error, repos) => {
    res.status(200).json(repos);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

