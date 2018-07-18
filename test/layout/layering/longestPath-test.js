const tape = require("tape"),
  fs = require("fs"),
  d3_dag = require("../../../");

const [square, grafo] = [
  "test/data/square.json",
  "test/data/grafo.json",
].map(file => d3_dag.dagStratify()(JSON.parse(fs.readFileSync(file))));

function toLayers(dag) {
  const layers = [];
  dag.eachDepth(n => (layers[n.layer] || (layers[n.layer] = [])).push(parseInt(n.id)));
  layers.forEach(l => l.sort((a, b) => a - b));
  return layers;
}

tape("longestPath() works for square", test => {
  d3_dag.dagLayerLongestPath(square);
  const layers = toLayers(square);
  test.equals(layers.length, 3);
  test.deepEquals(layers, [[0], [1, 2], [3]]);
  test.end();
});

tape("longestPath() works for grafo", test => {
  d3_dag.dagLayerLongestPath(grafo);
  const layers = toLayers(grafo);
  test.equals(layers.length, 6);
  test.deepEquals(
    layers,
    [[21], [12], [2, 4, 8], [0, 9, 11, 13, 19], [1, 3, 15, 16, 17, 18, 20], [5, 6, 7, 10, 14]]);
  test.end();
});
