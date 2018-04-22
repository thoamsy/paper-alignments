const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

// The shape of graph is {'www.udacity.com': ['a.com', 'b.com', 'c.cn']}
function computeRanks(graph) {
  const damping = 0.8;
  const loops = 10;
  let ranks = {};

  const pages = Object.keys(graph);
  // const nodes = Object.values(graph);
  const { length } = pages;
  pages.forEach(link => (ranks[link] = 1.0 / length));

  for (let i = 0; i < loops; i += 1) {
    for (const page of pages) {
      let newrank = (1 - damping) / length;
      for (const node of pages) {
        if (graph[node].includes(page)) {
          newrank += damping * (ranks[node] / graph[node].length);
        }
      }
      ranks[page] = newrank;
    }
  }
  return ranks;
}

(async function() {
  const file = await readFile(path.resolve(__dirname, '../db/stack.json'), {
    encoding: 'utf8',
  });
  const json = JSON.parse(file);
  const graph = json.reduce((graph, node) => {
    const [page, links] = Object.entries(node)[0];
    graph[page] = links;
    return graph;
  }, {});
  const ranks = computeRanks(graph);
  fs.writeFile(
    path.resolve(__dirname, '../db/graph.json'),
    JSON.stringify(ranks),
    'utf8',
    err => {
      if (err) {
        console.log(err);
      }
    },
  );
})();
