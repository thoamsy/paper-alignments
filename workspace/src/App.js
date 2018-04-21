import React, { Component } from 'react';
import axios from 'axios';
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
      const { data } = await axios.get('/search', {
        params: {
          q: this.state.searchValue,
        },
      });

      const response = Array.isArray(data)
        ? data.map(question => question.title).join('\n')
        : data;
      this.setState({
        response,
      });
    } finally {
      this.setState({ isSearching: false });
    }
  };

  render() {
    const { response, searchValue, isSearching } = this.state;
    return (
      <div className="section">
        <div className="container is-fluid">
          <Search
            vaule={searchValue}
            onChange={this.onInput}
            onSubmit={this.onSearch}
            isSearching={isSearching}
          />
          <hr />
          <div className="content">
            <p>{response}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
