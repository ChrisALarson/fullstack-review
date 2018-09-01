const express = require('express');
const db = require('../database/index');
const github = require('../helpers/github');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos/:username', function (req, res) {
  let username = req.params.username;
  github.getReposByUsername(username, (error, response) => {
    if (error) return console.log(error);
    let data = JSON.parse(response);
    let repos = data.items;
    db.save(repos, (error) => {
      if (error) return console.log(err);
      // console.log(reposSaved);
    });
    res.status(201).json({ ReposSubmitted: repos.length });
  });

  // writing some code here....
  // doing some coding while screen capping.. testing out OBS!
  // testing out a full screen recording now.... 

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

// https://api.github.com/search/repositories?q=user:ChrisALarson&sort=updated


app.get('/repos', function (req, res) {
  db.retrieve((error, repos) => {
    console.log(repos);
    res.status(200).json(repos);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

