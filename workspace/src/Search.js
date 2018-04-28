import React from 'react';
import cx from 'classnames';

const Search = ({ onSubmit, value, onChange, isSearching }) => (
  <form action="/search" onSubmit={onSubmit} className="form">
    <div className="field has-addons has-addons-centered">
      <div className="control">
        <input
          type="search"
          className="input is-large"
          value={value}
          onChange={onChange}
        />
      </div>
      <div className="control">
        <button
          className={cx('is-large', 'button', 'is-info', {
            'is-loading': isSearching,
          })}
        >
          Search
        </button>
      </div>
    </div>
  </form>
);

export default Search;
