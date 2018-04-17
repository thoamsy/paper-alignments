import React, { Component } from 'react';
import Search from './Search';

class App extends Component {
  state = {
    searchValue: '',
  };

  onInput = ({ target: { value } }) => {
    this.setState({ searchValue: value });
  };
  onSearch = event => {
    event.preventDefault();
    fetch(`/search?q=${this.state.searchValue}`).then(console.log);
  };

  render() {
    return (
      <div className="section">
        <div className="container">
          <Search
            vaule={this.state.searchValue}
            onChange={this.onInput}
            onSubmit={this.onSearch}
          />
        </div>
      </div>
    );
  }
}

export default App;
