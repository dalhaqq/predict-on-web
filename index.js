let rawData, dataSet, trainData, labels;

function reset() {
    dataSet = [];
    trainData = [];
    labels = [];
    params = [];
}

function generateForm() {
    let form = document.getElementById('prediction-box');
    while(form.hasChildNodes()) {
        form.removeChild(form.lastChild);
    }
    for (let i = 0; i < dataSet.length - 1; i++) {
        let label = document.createElement('label');
        label.innerHTML = params[i];
        label.setAttribute('for', 'val' + i);
        let select = document.createElement('select');
        select.setAttribute('id', 'val' + i);
        select.setAttribute('name', 'val' + i);
        let vals = dataSet[i].values();
        for (let val = vals.next(); val.done === false; val = vals.next()) {
            let option = document.createElement('option');
            option.setAttribute('value', val.value);
            option.innerHTML = val.value;
            select.appendChild(option);
        }
        let br = document.createElement('br');
        form.appendChild(label);
        form.appendChild(select);
        form.appendChild(br);
    }
    let submit = document.createElement('button');
    submit.setAttribute('onclick', 'predict()');
    submit.innerHTML = 'Predict';
    form.appendChild(submit);
}

function processData() {
    reset();
    rawData = document.getElementById('data').value;
    let data = rawData.trim().split('\n');
    params = data.shift().split(',');
    for (let i = 0; i < data.length; i++) {
        if (data[i] === '') {
            data.splice(i, 1);
            i--;
            continue;
        }
        data[i] = data[i].split(',');
        for (let j = 0; j < data[i].length; j++) {
            if (i === 0) {
                dataSet[j] = new Set();
            }
            data[i][j] = data[i][j].trim();
            dataSet[j].add(data[i][j]);
        }
        trainData.push(data[i]);
        if (!labels.includes(data[i][data[i].length - 1])) {
            labels.push(data[i][data[i].length - 1]);
        }
    }
    generateForm();
}

function count(arr, el) {
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == el) {
            counter++;
        }
    }
    return counter;
}

function predict() {
    let inputData = [];
    let counts = {};
    let Y = [];
    for (let i = 0; i < trainData.length; i++) {
        Y.push(trainData[i][trainData[i].length - 1]);
    }
    for (let i = 0; i < dataSet.length - 1; i++) {
        let select = document.getElementById("val" + i);
        inputData.push(select.value);
    }
    labels.forEach(label => {
        counts[label] = count(Y, label)/Y.length;
    });
    for (let i = 0; i < inputData.length; i++) {
        labels.forEach(label => {
            let XCount = 0;
            for (let j = 0; j < trainData.length; j++) {
                if (inputData[i] == trainData[j][i] && Y[j] == label) {
                    XCount++;
                }
            }
            counts[label] *= XCount/count(Y, label);
        });
    }
    let max = 0;
    let maxLabel = 'Unpredictable';
    for (let label in counts) {
        if (counts[label] > max) {
            max = counts[label];
            maxLabel = label;
        }
    }
    let result = document.getElementById('result');
    result.innerHTML = 'Result: ' + maxLabel + '<br>Score: ' + max;
    console.log(counts);
}