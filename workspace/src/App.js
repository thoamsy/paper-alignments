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

      this.setState({
        response: data,
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
            {Array.isArray(response) ? (
              <ul>
                {response.map(result => (
                  <article className="message is-link" key={result}>
                    <header className="message-header">
                      <a href={result}>{result}</a>
                    </header>
                    <div className="message-body">You got me!!!</div>
                  </article>
                ))}
              </ul>
            ) : (
              <p>Nothing Search.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
