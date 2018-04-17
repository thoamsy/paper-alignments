import React from 'react';

const Search = ({ onSubmit, value, onChange }) => (
  <form action="" onSubmit={onSubmit}>
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
        <button className="button is-info">Search</button>
      </div>
    </div>
  </form>
);

export default Search;
