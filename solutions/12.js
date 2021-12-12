
const { sum } = require('../util');

// --

function first(input) {
  const start = new Node1('start');
  findAllPaths(start, input)

  return start.countEnds();
}

function second(input) {
  const start = new Node2('start');
  findAllPaths(start, input);

  return start.countEnds();
}

function findAllPaths(start, connections) {
  let edges = [start];
  while (edges.length > 0) {
    const newEdges = [];

    for (edge of edges) {
      const ways = connections[edge.name]
        .filter((name) => edge.pathAllows(name));

      if (ways.length > 0) {
        const newNodes = ways.map((name) => new edge.constructor(name, edge));
        for (node of newNodes) {
          edge.children.push(node);
          if (node.name !== 'end') newEdges.push(node);
        }
      }
    }
    
    edges = newEdges;
  }
}

class Node1 {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent || undefined;
    this.children = [];
  }

  pathAllows(name) {
    return (
      this.name !== name.toLowerCase() &&
      (this.parent ? this.parent.pathAllows(name) : true)
    );
  }

  countEnds() {
    return (this.name === 'end' ? 1 : 0) +
      sum(this.children.map((child) => child.countEnds()));
  }
}

class Node2 extends Node1 {
  constructor(name, parent) {
    super(name, parent)
  }

  pathAllows(name, seen = [name.toLowerCase()]) {
    seen.push(this.name);

    const lowercase = seen.filter((name) => name === name.toLowerCase());
    const check = (lowercase.length - (new Set(lowercase)).size) > 1;

    if (check) return false;
    else return this.parent ? this.parent.pathAllows(name, seen) : true;
  }
}

function format(input) {
  input = input
    .split(/\r\n|\r|\n/)
    .map((line) => line.split('-'));

    const connections = {}
    for ([cave1, cave2] of input) {
      if (!connections[cave1]) connections[cave1] = [];
      if (!connections[cave2]) connections[cave2] = [];
      connections[cave1].push(cave2);
      connections[cave2].push(cave1);
    }
    
    // Remove ability to return to start
    for (key in connections) {
      connections[key] = connections[key].filter((cave) => cave !== 'start');
    }

    return connections;
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
