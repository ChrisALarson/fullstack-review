import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount() {
    let request = $.ajax({
      method: 'GET',
      url: '/repos'
    });

    request.done((data) => {
      this.setState( {
        repos: data
      });
    });
  }

  search (term) {
    console.log(`${term} was searched --`);
    let self = this;
    let request = $.ajax({
      url: `/repos/${term}`,
      method: 'POST'
    });
    request.done((data) => {
      console.log(`${data.reposSubmitted} repos from ${term} submitted to DB --`);
      let getRepos = $.ajax({
        url: '/repos',
        method: 'GET'
      });
      getRepos.done((repos) => {
        self.setState({
          repos: repos
        });
      });
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));