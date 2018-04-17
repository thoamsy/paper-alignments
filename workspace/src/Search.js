import React from 'react';
import cx from 'classnames';

const Search = ({ onSubmit, value, onChange, isSearching }) => (
  <form action="/search" onSubmit={onSubmit}>
    <div className="field has-addons">
      <div className="control">
        <input
          type="search"
          className="input"
          value={value}
          onChange={onChange}
        />
      </div>
      <div className="control">
        <button
          className={cx('button', 'is-info', { 'is-loading': isSearching })}
        >
          Search
        </button>
      </div>
    </div>
  </form>
);

export default Search;
