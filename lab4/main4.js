    let fs = require('fs');
    let file_reader=fs.readFileSync('l4-2.txt', 'utf8');

function fileReader() {
    let text = file_reader;
    let splitArray = text.split(/\r?\n/);
    let n = parseFloat(splitArray[0]);
    let arr = [];
    for (let i = 1; i < splitArray.length; i++) {
        arr.push(splitArray[i].replace(/ +$/, "").split(' ').map(Number));
    }
    return arr;
}

function fulkerson (iArr) {

    let arr = iArr.map(function(arr1) {
        return arr1.slice();
    });

    let maxFlow = [];
    let paths = [];
    let limit = 0;
    while(pathFinder(arr) && limit < 25){
        limit++;
        
        process.stdout.write(`\n\nІтерація №${limit}`);
        process.stdout.write(`\n\nПошук шляхів від 0 до ${arr.length - 1}`);

        let path = pathFinder(arr);

        let minEdge = {
            coordinates: [],
            value: Infinity,
            i: 0
        }

        for (let i = 0; i < path.length; i++) {
            if(arr[path[i][0]][path[i][1]] < minEdge.value){
                minEdge.coordinates = [path[i][0], path[i][1]];
                minEdge.value = arr[path[i][0]][path[i][1]];
                minEdge.i = i;
            }
        }

        for (let i = 0; i < path.length; i++) {
            if(i == minEdge.i) arr[path[i][0]][path[i][1]] = 0;
            else arr[path[i][0]][path[i][1]] -= minEdge.value;
        }

        
        maxFlow.push(minEdge.value);
        paths.push(path);

        process.stdout.write(`\n\nНайдений шлях: `);
        for (let i = 0; i < path.length; i++) {
            if(i == path.length - 1) process.stdout.write(`(${path[i][0]})=>(${path[i][1]})`);
            else process.stdout.write(`(${path[i][0]})=>`);
        }
        process.stdout.write(`\nМінімальне ребро шляху: (${minEdge.coordinates[0]},${minEdge.coordinates[1]}) = ${minEdge.value}`);
        process.stdout.write(`\n\nНова матриця: \n${printMatrix(arr)}`);
    }

    process.stdout.write(`\n\nУсі шляхи\n`);

    for (let i = 0; i < paths.length; i++) {
        for (let j = 0; j < paths[i].length; j++) {
            if(j == paths[i].length - 1) process.stdout.write(`(${paths[i][j][0]})=>(${paths[i][j][1]})`);
            else process.stdout.write(`(${paths[i][j][0]})=>`);
        }
        process.stdout.write(`\nМінімальне ребро = ${maxFlow[i]}\n`);
    }

    process.stdout.write(`\nМаксимальний потік:\n`);

    for (let i = 0; i < maxFlow.length; i++) {
        if(i == maxFlow.length - 1) process.stdout.write(`${maxFlow[i]}`);
        else process.stdout.write(`${maxFlow[i]} + `);
    }

    process.stdout.write(` = ${maxFlow.reduce((a, b) => a + b, 0)}`);

    function pathFinder (a){
        let path = [];
        let edgeList = [];
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[i].length; j++) {
                if(a[i][j] != 0) edgeList.push({coordinates:[i,j], value:a[i][j]});
            }
        }

        if(edgeList.findIndex(val => val.coordinates[0] == 0) == -1) return 0;
        path.push(edgeList[edgeList.findIndex(val => val.coordinates[0] == 0)].coordinates);

        while(edgeList.findIndex(val => val.coordinates[0] == path[path.length - 1][1]) != -1){
            path.push(edgeList[edgeList.findIndex(val => val.coordinates[0] == path[path.length - 1][1])].coordinates);
            edgeList.splice(edgeList.findIndex(val => val.coordinates == path[path.length - 1]), 1);
            if(edgeList.findIndex(val => val.coordinates[0] == path[path.length - 1][1]) == -1 && path[path.length - 1][1] != a.length - 1){
                path.splice(path.length - 1);
            }
        }

        if(path[path.length - 1][1] == a.length - 1) return path;
        else{
            a[path[path.length - 1][0]][path[path.length - 1][1]] = 0
            return pathFinder(a);
        }
    }

}

function printMatrix(a){
    let output = "";
    for (let i = 0; i < a.length; i++) {
        output += "["
        for (let j = 0; j < a[i].length; j++) {
            if(a[i][j] < 10) output += `${a[i][j]}   `;
            else if(a[i][j] < 100) output += `${a[i][j]}  `;
            else output += `${a[i][j]} `;
        }
        output += "]\n"
    }
    return output;
}

let arr2 = fileReader();
fulkerson(arr2);