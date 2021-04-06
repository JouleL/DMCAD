    let fs = require('fs');
    let file_reader=fs.readFileSync('l2-1.txt', 'utf8');

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

function eilerPostman (arr) {
    process.stdout.write("\nПеревірка парності вузлів");

    let edgeCount = [];
    for (let i = 0; i < arr.length; i++) {
        edgeCount.push(0);
        for (let j = 0; j < arr[i].length; j++) {
            if(arr[i][j] != 0) edgeCount[i]++;
        }
    }
    let oddCount = 0;
    for (let i = 0; i < edgeCount.length; i++) {
        if(edgeCount[i] % 2 != 0) oddCount++;
    }

    if(oddCount > 2){
        console.log("\nЗнайдено не парні взули, дублюємо ребра");

        let oddIndexes = [];
        for (let i = 0; i < edgeCount.length; i++) {
            if(edgeCount[i] % 2 != 0) oddIndexes.push(i);
        }

        let duplicatePairs = [];

        while (oddIndexes.length > 1){
            let first = oddIndexes[0];
            let second;
            for (let i = 1; i < oddIndexes.length; i++) {
                if(arr[first][oddIndexes[i]] != 0 && !second) second = oddIndexes[i];
            }
            if(!second) {
                console.log("\nНеможливо продублювати ребра");
                return 0;
            }
            else{
                oddIndexes.splice(oddIndexes.indexOf(first), 1);
                oddIndexes.splice(oddIndexes.indexOf(second), 1);
                duplicatePairs.push([first, second]);
                console.log(`\n[${first}-${second}]`);
            }
        }
        
        eulerianPath(arr, duplicatePairs);

    }else{
        eulerianPath(arr);
    }

    function eulerianPath(a, b = []) {
        console.log("\nПошук Ейлерового циклу");
        let sum = 0;
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[i].length; j++) {
                sum += a[i][j];
            }
        }
        sum /= 2;
        for (let i = 0; i < b.length; i++) {
            sum += a[b[i][0]][b[i][1]];
        }

        let stack1 = [0];
        let stack2 = [0];

        let edgeCount = 2;
        let limit = 0;
        while(edgeCount > 1 && limit < 25){
            limit++;

            let next = "O";
            for (let i = 0; i < a[stack1[stack1.length - 1]].length; i++) {
                if(a[stack1[stack1.length - 1]][i] != 0 && next == "O") next = i;
            }
            
            console.log(`\nШлях: ${stack1}`);
            console.log(`Цикл: ${stack2}`);
            if(next == stack2[stack2.length - 1]){
                stack2.push(stack1[stack1.length - 1])


                let newB = []
                let del = 0;
                for (let i = 0; i < b.length; i++) {
                    if(!(b[i][0] == stack1[stack1.length - 2] && b[i][1] == stack1[stack1.length - 1]) && !(b[i][0] == stack1[stack1.length - 1] && b[i][1] == stack1[stack1.length - 2])) newB.push(b[i]);
                    else {
                        del++;
                    }
                }
                b = [...newB];
                if(del == 0){
                    a[stack1[stack1.length - 1]][next] = 0;
                    a[next][stack1[stack1.length - 1]] = 0;
                }

            }
            else{
                stack1.push(next);

                let newB = []
                let del = 0;
                for (let i = 0; i < b.length; i++) {
                    if(!(b[i][0] == stack1[stack1.length - 2] && b[i][1] == stack1[stack1.length - 1]) && !(b[i][0] == stack1[stack1.length - 1] && b[i][1] == stack1[stack1.length - 2])) newB.push(b[i]);
                    else {
                        del++;
                    }
                }
                b = [...newB];
                if(del == 0){
                    a[stack1[stack1.length - 1]][stack1[stack1.length - 2]] = 0;
                    a[stack1[stack1.length - 2]][stack1[stack1.length - 1]] = 0;
                }
            }


            edgeCount = 0;
            for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < a[i].length; j++) {
                    if(a[i][j] != 0) edgeCount++;
                }
            }
            edgeCount /= 2;
            edgeCount += b.length;
        }


        let result = [...stack2];

        for (let i = stack1.length - 1; i >= 0; i--) {
            result.push(stack1[i]);
        }
        let ccounter=[];
        console.log("\n");
        for (let i = 0; i < result.length; i++) {
            ccounter.push(result[i]);
            process.stdout.write(result[i] + "->");
        }

        console.log(`\n\n Сумма: ${sum}`);

        console.log(result);

    }
}
let arr1 = fileReader();
eilerPostman(arr1);