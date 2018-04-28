import React, { Component } from 'react';
import axios from 'axios';
import Search from './Search';

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

  parseTitleWithUrl(url) {
    const lastSlash = url.lastIndexOf('/');
    return url.slice(lastSlash + 1).replace(/-/g, ' ');
  }

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
              {Array.isArray(urls) ? (
                <ul>
                  {urls.map((result, index) => (
                    <article className="card" key={result}>
                      <header className="card-header">
                        <a
                          href={result}
                          className="card-header-title"
                          style={{ textTransform: 'capitalize' }}
                        >
                          {this.parseTitleWithUrl(result)}
                        </a>
                      </header>
                      <div className="card-content">
                        <div
                          className="content has-text-left"
                          dangerouslySetInnerHTML={{
                            __html: preload[index].replace(
                              new RegExp('<style>[^/]+/>', 'gi'),
                              '',
                            ),
                          }}
                        >
                          {}
                        </div>
                      </div>
                    </article>
                  ))}
                </ul>
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
