
const { range, zip } = require('../util');

// --

function first(input) {
  const start = [0, 0];
  const end = [input[0].length - 1, input.length - 1];
  return findBestPathCost(input, start, end);
}

function second(input) {  
  function incrementMap(map, inc) {
    return map.map((line) => line.map((n) => ((n + inc - 1) % 9) + 1))
  }

  const tall = [...range(5)]
    .map((i) => incrementMap(input, i))
    .flat();

  const map = zip([...range(5)].map((i) => incrementMap(tall, i)));


  const start = [0, 0];
  const end = [map[0].length - 1, map.length - 1];
  return findBestPathCost(map, start, end);
}

// Map is 2D array, startPos & endPos are [x, y] arrays
function findBestPathCost(map, startPos, endPos) {
  const mapHeight = map.length;
  const mapWidth = map[0].length;

  const [startX, startY] = startPos;
  const start = new Node(startX, startY);
  let edges = new NodeSet(start);
  let seen = new NodeSet();

  let end;
  const [endX, endY] = endPos;
  while(!end) {
    const current = edges.pop();
    const {x, y} = current;

    // End condition
    if (x === endX && y === endY) end = current;
    
    const newEdges = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1]
    ].map(([nX, nY]) => {
      const moveCost = map[nY]?.[nX];
      const inSeen = seen.has(Node.getIdFromXY(nX, nY));
      return (moveCost && !inSeen)
        ? new Node(nX, nY, current.cost + moveCost, current)
        : null
    }).filter((node) => (node !== null));

    seen.push(current);
    newEdges.forEach((edge) => edges.push(edge));
    edges.sort();
  }

  return end.cost;
}

class NodeSet {
  constructor(...nodes) {
    this.nodes = [];
    this.nodeSet = new Set();

    nodes.forEach((node) => this.push(node));
  }

  push(node) {
    if (this.nodeSet.has(node.id)) {
      return false;
    } else {
      this.nodeSet.add(node.id);
      this.nodes.push(node);
      return true;
    }
  }

  pop() {
    const node = this.nodes.pop();
    if (!node) return undefined;
    else {
      this.nodeSet.delete(node.id);
      return node;
    }
  }

  sort() {
    this.nodes.sort((a, b) => b.priority - a.priority);
  }

  has(id) { return this.nodeSet.has(id) }
}

class Node {
  static getIdFromXY(x, y) {
    if (!x || !y) return undefined;
    return x.toString().padStart(2, '0') + y.toString().padStart(2, '0');
  }

  constructor(x, y, cost = 0, parent) {
    this.x = x;
    this.y = y;
    this.id = Node.getIdFromXY(x, y);
    this.cost = cost;
    this.futureCost = (198 - (x + y)) * 0.1;
    this.priority = this.cost + this.futureCost;
    this.parent = parent;
  }
}

function format(input) {
  return input
    .split(/\r\n|\r|\n/)
    .map((line) => line
      .split('')
      .map((n) => parseInt(n)));
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
