import React, { Component } from 'react';
import axios from 'axios';
import Search from './Search';
import Result from './Result';

class App extends Component {
  state = {
    searchValue: '',
    urls: [],
    preload: [],
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

      this.setState(data);
    } finally {
      this.setState({ isSearching: false });
    }
  };

  render() {
    const { urls, searchValue, isSearching, preload } = this.state;
    return (
      <div className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <Search
              vaule={searchValue}
              onChange={this.onInput}
              onSubmit={this.onSearch}
              isSearching={isSearching}
            />
            <hr />
            <div className="content">
              {Array.isArray(urls) && urls.length ? (
                urls.map((url, index) => (
                  <Result key={url} {...preload[index]} url={url} />
                ))
              ) : (
                <p>Nothing Search.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
