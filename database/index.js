const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  fullname: String,
  owner_id: Number,
  owner_login: String,
  htmlUrl: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  watchers: Number,
  issues: Number,
  stars: Number,
  forks: Number
});

repoSchema.index({ stars: -1 , forks: -1 });

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  let formattedRepos = [];

  repos.forEach(repo => {
    let formattedRepo = {
      id: repo.id,
      name: repo.name,
      fullname: repo.fullname,
      owner_id: repo.owner.id,
      owner_login: repo.owner.login,
      htmlUrl: repo.html_url,
      description: repo.description,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      watchers: repo.watchers_count,
      stars: repo.stargazers_count,
      issues: repo.open_issues_count,
      forks: repo.forks
    };
    formattedRepos.push(formattedRepo);
  });

  Repo.insertMany(formattedRepos, { ordered: false }, (error, docs) => {
    if (error) return console.log(error);
  });
};

let retrieve = (callback) => {
  Repo.find()
    .limit(25)
    .sort({ stars: -1, forks: -1 })
    .exec(callback);
};

module.exports = { save, retrieve };