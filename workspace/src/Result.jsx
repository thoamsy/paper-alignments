import React from 'react';

function parseTitleWithUrl(url) {
  const lastSlash = url.lastIndexOf('/');
  return url.slice(lastSlash + 1).replace(/-/g, ' ');
}
function parseTagToUrl(tag) {
  return `https://stackoverflow.com/questions/tagged/${tag}`;
}
const Result = ({ url, html, tags }) => (
  <article className="card" key={url} style={{ marginTop: 20 }}>
    <header className="card-header" style={{ flexDirection: 'column' }}>
      <a
        href={url}
        target="_blank"
        className="card-header-title"
        style={{
          textTransform: 'capitalize',
          color: 'hsl(204, 86%, 53%)',
          fontSize: 18,
          paddingBottom: 0,
        }}
      >
        {parseTitleWithUrl(url)}
      </a>
      <p
        className="card-header-title"
        style={{
          fontSize: 13,
          color: '#006621',
          paddingTop: 0,
          fontWeight: 'normal',
        }}
      >
        {url}
      </p>
    </header>
    {html && (
      <div className="card-content">
        <div
          className="content has-text-left"
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
        <div className="tags">
          {tags.map(tag => (
            <a
              target="_blank"
              className="tag is-info"
              key={tag}
              href={parseTagToUrl(tag)}
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
    )}
  </article>
);

export default Result;
