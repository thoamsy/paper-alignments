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
    <header className="card-header">
      <a
        href={url}
        target="_blank"
        className="card-header-title"
        style={{ textTransform: 'capitalize', color: 'hsl(204, 86%, 53%)' }}
      >
        {parseTitleWithUrl(url)}
      </a>
    </header>
    <div className="card-content">
      <div
        className="content has-text-left"
        dangerouslySetInnerHTML={{
          __html: html.replace(new RegExp('<style>[^/]+/>', 'gi'), ''),
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
  </article>
);

export default Result;
