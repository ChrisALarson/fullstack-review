import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <p>Here are the top {props.repos.length} repos by stars!</p>
    {
      props.repos.map((repo, index) => (
        <div key={index}>
          <span> { repo.owner_login }  </span>
          <a href={ repo.htmlUrl }> { repo.name }  </a>
          <span> Stars: { repo.stars }  </span>
          <span> Forks: { repo.forks }  </span>
        </div>
      ))
    }
  </div>
)

export default RepoList;