import React, { Component } from 'react';
import Search from './Search';

class App extends Component {
  state = {
    searchValue: '',
    response: '',
    isSearching: false,
  };

  onInput = ({ target: { value } }) => {
    this.setState({ searchValue: value });
  };
  onSearch = async event => {
    event.preventDefault();
    this.setState({ isSearching: true });
    try {
      const txt = fetch(`/search?q=${this.state.searchValue}`).then(res =>
        res.text(),
      );
      this.setState({
        response: await txt,
      });
    } finally {
      this.setState({ isSearching: false });
    }
  };

  render() {
    const { response, searchValue, isSearching } = this.state;
    return (
      <div className="section">
        <div className="container">
          <Search
            vaule={searchValue}
            onChange={this.onInput}
            onSubmit={this.onSearch}
            isSearching={isSearching}
          />
        </div>
        <h1 className="title">{response}</h1>
      </div>
    );
  }
}

export default App;
