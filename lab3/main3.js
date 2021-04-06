    let fs = require('fs');
    let file_reader=fs.readFileSync('l3-1.txt', 'utf8');

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

function comVoyag (arr){
    console.log(arr2);
    console.log("\nКомівояжер");

    let arrCopy = arr.map(function(arr1) {
        return arr1.slice();
    });

    arr = minColRowDel(arr)[0];
    let minRow = minColRowDel(arr)[1];
    let minCol = minColRowDel(arr)[2];
    console.log(arr);

    let minLim = minRow.reduce((a, b) => a + b, 0) + minCol.reduce((a, b) => a + b, 0);

    let limit = 0;
    let banList = [];
    let result = `Path: `;

    while(limit < 20 && banList.length < arr.length * 2){
        limit++;

       process.stdout.write(`\n\n=Ітерація №${limit}=`);

        let maxZeroMatrix = maxZeroMatrixCount(arr);
        let maxZero = {
            value: 0,
            position: [0,0]
        }
        for (let i = 0; i < maxZeroMatrix.length; i++) {
            for (let j = 0; j < maxZeroMatrix[0].length; j++) {
                if(maxZeroMatrix[i][j] > maxZero.value){
                    maxZero.value = maxZeroMatrix[i][j];
                    maxZero.position = [i, j];
                }
            }
        }
        process.stdout.write(`\n\nПеревірка ребра (${maxZero.position[0]}; ${maxZero.position[1]}) = ${maxZero.value}\n`);
    
        for (let i = 0; i < arr.length; i++) {
            process.stdout.write("\n["+arr[i]+"]");
        }

        includeResult = include(arr, maxZero.position, banList);
        notIncludeResult = notInclude(arr, maxZero.position);

        if(includeResult.minLim < notIncludeResult.minLim){
            process.stdout.write(`\n\nВключаючи (${maxZero.position})`);
            arr = includeResult.matrix;
            banList.push(maxZero.position[0], maxZero.position[1]);
        }else{
            process.stdout.write(`\n\nНе включаючи (${maxZero.position})`);
            arr = notIncludeResult.matrix;
        }

        tempResult = "Список ребер: \n\n";
        for (let i = 0; i < banList.length-1; i+=2) {
            tempResult += `(${banList[i]},${banList[i+1]})`;
            if(i != banList.length-2) tempResult += ` => `;
        }
        process.stdout.write(`\n${tempResult}`);
    }

    for (let i = 0; i < banList.length-1; i+=2) {
        const element = banList[i];
        result += `(${banList[i]}, ${banList[i+1]}) => `;
    }

    let sum = 0;

    for (let i = 0; i < arrCopy.length; i++) {
        for (let j = 0; j < arrCopy[i].length; j++) {
            for (let k = 0; k < banList.length-1; k+=2) {
                if(i == banList[k] && j == banList[k+1]) sum += arrCopy[i][j];
            }
        }
    }

    process.stdout.write(`\n\nSum: ${sum}`);

    let resultCycle = cycleBuilder(banList);

    process.stdout.write(`\n\n${resultCycle}`);

    function minColRowDel (arr){

        let tempArr = arr.map(function(arr) {
            return arr.slice();
        });

        let minRow = [];
        let minCol = [];
    
        for (let i = 0; i < tempArr.length; i++) {
            minRow.push(Infinity);
            for (let j = 0; j < tempArr[i].length; j++) {
                if(tempArr[i][j] < minRow[i]) minRow[i] = tempArr[i][j];
            }
        }        
    
        for (let i = 0; i < tempArr.length; i++) {
            for (let j = 0; j < tempArr[i].length; j++) {
                tempArr[i][j] -= minRow[i];
            }
        }
        
        for (let i = 0; i < tempArr.length; i++) {
            minCol.push(Infinity);
            for (let j = 0; j < tempArr[i].length; j++) {
                if(tempArr[j][i] < minCol[i]) minCol[i] = tempArr[j][i];
            }
        }
            
        for (let i = 0; i < tempArr.length; i++) {
            for (let j = 0; j < tempArr[i].length; j++) {
                tempArr[j][i] -= minCol[i];
            }
        }

        return [tempArr, minRow, minCol];
    }

    function maxZeroMatrixCount(arr){
        let result = [];
        console.log("\n");
        for (let i = 0; i < arr.length; i++) {
            result.push([]);
            for (let j = 0; j < arr[i].length; j++) {
                if(arr[i][j] == 0){
                    let tempArr = arr.map(function(arr) {
                        return arr.slice();
                    });
                    tempArr[i][j] = Infinity;
                    let minRow = Infinity;
                    for (let k = 0; k < tempArr.length; k++) {
                        if(tempArr[i][k] < minRow) minRow = tempArr[i][k];
                    }

                    let minCol = Infinity;
                    for (let k = 0; k < tempArr.length; k++) {
                        if(tempArr[k][j] < minCol) minCol = tempArr[k][j];
                    }
                    result[i].push(minRow + minCol);
                    process.stdout.write(`\nO(${i};${j}) = ${minRow} + ${minCol} = ${minRow + minCol}`);
                }
                else result[i].push(0);
            }
        }
        return result;
    }

    function notInclude(inputArr, position){
        let tempArr = inputArr.map(function(arr) {
            return arr.slice();
        });
        tempArr[position[0]][position[1]] = Infinity;

        let exportArr = minColRowDel(tempArr)[0];
        let minRow = minColRowDel(tempArr)[1];
        let minCol = minColRowDel(tempArr)[2];

        minRow.forEach(function(item, i) { if (item == Infinity) minRow[i] = 0; });
        minCol.forEach(function(item, i) { if (item == Infinity) minCol[i] = 0; });

        let minLim = minRow.reduce((a, b) => a + b, 0) + minCol.reduce((a, b) => a + b, 0);
        return {matrix:exportArr, minLim:minLim};
    }

    function include(inputArr, position, banList){
        let tempArr = inputArr.map(function(arr) {
            return arr.slice();
        });
        tempArr[position[1]][position[0]] = Infinity;

        for (let i = 0; i < banList.length-1; i+=2) {
            if(banList[i] == position[0]){
                tempArr[banList[i+1]][position[1]] = Infinity;
                tempArr[position[1]][banList[i+1]] = Infinity;
            }
            if(banList[i + 1] == position[0]){
                tempArr[banList[i]][position[1]] = Infinity;
                tempArr[position[1]][banList[i]] = Infinity;
            }
            if(banList[i] == position[1]){
                tempArr[banList[i+1]][position[0]] = Infinity;
                tempArr[position[0]][banList[i+1]] = Infinity;
            }
            if(banList[i+1] == position[1]){
                tempArr[banList[i]][position[0]] = Infinity;
                tempArr[position[0]][banList[i]] = Infinity;
            }
        }

        for (let i = 0; i < tempArr.length; i++) {
            for (let j = 0; j < tempArr[i].length; j++) {
                if(i == position[0] || j == position[1]) tempArr[i][j] = Infinity;
            }
        }


        let exportArr = minColRowDel(tempArr)[0];
        let minRow = minColRowDel(tempArr)[1];
        let minCol = minColRowDel(tempArr)[2];

        minRow.forEach(function(item, i) { if (item == Infinity) minRow[i] = 0; });
        minCol.forEach(function(item, i) { if (item == Infinity) minCol[i] = 0; });

        let minLim = minRow.reduce((a, b) => a + b, 0) + minCol.reduce((a, b) => a + b, 0);

        if(minRow.every( (val, i, arr) => val === arr[0] ) && minCol.every( (val, i, arr) => val === arr[0] )) minLim--;

        return {matrix:exportArr, minLim:minLim};
    }

    function cycleBuilder (a) {
        let result = "Cycle: ";
        let resultArr = [a[0], a[1]];

        for (let i = 0; i < a.length/2 - 1; i++) {
            if(findNext(a, resultArr[resultArr.length - 1]) != Infinity) resultArr.push(findNext(a, resultArr[resultArr.length - 1]));
            else return "Цикл не знайдений";
        }
        
        function findNext(a, b){
            for (let i = 0; i < a.length - 1; i+=2) {
                if(a[i] == b) {
                    return a[i+1];
                }
            }
            return Infinity;
        }

        for (let i = 0; i < resultArr.length; i++) {
            result += `(${resultArr[i]})`;
            if(i != resultArr.length - 1) result += " => ";
        }

        return result;
    }
}

function graph (arr){
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if(Math.max(...arr[i]) > max) max = Math.max(...arr[i]);
    }

    max++;

    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push([]);
        for (let j = 0; j < arr[i].length; j++) {
            if(i == j) result[i].push(Infinity);
            else if(arr[i][j] == 0) result[i].push(max);
            else result[i].push(arr[i][j]);
        }
    }

    return result;
}
let arr2 = fileReader();
comVoyag(graph(arr2));