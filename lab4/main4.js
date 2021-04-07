'use strict'
let fs = require('fs');
    let file_reader=fs.readFileSync('l4-1.txt', 'utf8');
    
function fileReader() {
    let text = file_reader;
    let nArr = text.split(/\r?\n/);
    let n = parseFloat(nArr[0]);
    let arr = [];
    for (let i = 1; i < nArr.length; i++) {
        arr.push(nArr[i].replace(/ +$/, "").split(' ').map(Number));
    }
    return arr;
}
let graph = fileReader();
console.log("The maximum possible flow is " +
	fordFulkerson(graph, 0, 7));
function bfs(rGraph, s, t, parent) {
	var visited = [];
	var queue = [];
	var V = rGraph.length;
	for (var i = 0; i < V; i++) {
		visited[i] = false;
	}
	queue.push(s);
	visited[s] = true;
	parent[s] = -1;

	while (queue.length != 0) {
		var u = queue.shift();
		for (var v = 0; v < V; v++) {
			if (visited[v] == false && rGraph[u][v] > 0) {
				queue.push(v);
				parent[v] = u;
				visited[v] = true;
			}
		}
	}
	return (visited[t] == true);
}

function fordFulkerson(graph, s, t) {
	let res;
	var rGraph = [];
	for (var u = 0; u < graph.length; u++) {
		var temp = [];
		for (v = 0; v < graph.length; v++) {
			temp.push(graph[u][v]);
		}
		rGraph.push(temp);
	}
	var parent = [];
	var maxFlow = 0;

	while (bfs(rGraph, s, t, parent)) {
		var pathFlow = Number.MAX_VALUE;
		for (var v = t; v != s; v = parent[v]) {
			u = parent[v];
			pathFlow = Math.min(pathFlow, rGraph[u][v]);
		}
		for (v = t; v != s; v = parent[v]) {
			u = parent[v];
			rGraph[u][v] -= pathFlow;
			rGraph[v][u] += pathFlow;
			res = (u+1) + "-" + (v + 1) + " " + res;
	}
		console.log(res);
		res = "";
		console.log(pathFlow);
		maxFlow += pathFlow;
	}
	
	return maxFlow;
}
