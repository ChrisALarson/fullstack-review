import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <p>There are {props.repos.length} repos.</p>
    {
      props.repos.map(repo => (
        <div>
          <span>{ repo.owner_login } </span>
          <a href={ repo.htmlUrl }>{ repo.name } </a>
          <span>Stars: { repo.stars } </span>
          <span>Forks: { repo.forks } </span>
        </div>
      ))
    }
  </div>
)

export default RepoList;