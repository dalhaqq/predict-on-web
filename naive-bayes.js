let rawData = `
    LAKI-LAKI, RENDAH, 1, YA
    LAKI-LAKI, TINGGI, 2, TIDAK
    LAKI-LAKI, TINGGI, 1, YA
    PEREMPUAN, RENDAH, 1, TIDAK
    LAKI-LAKI, RENDAH, 1, TIDAK
    LAKI-LAKI, TINGGI, 1, TIDAK
    PEREMPUAN, RENDAH, 2, TIDAK
    PEREMPUAN, RENDAH, 2, YA
    PEREMPUAN, TINGGI, 1, TIDAK
    PEREMPUAN, RENDAH, 1, TIDAK
    LAKI-LAKI, RENDAH, 2, YA
    PEREMPUAN, RENDAH, 1, TIDAK
    PEREMPUAN, RENDAH, 1, TIDAK
    LAKI-LAKI, RENDAH, 2, TIDAK
    LAKI-LAKI, TINGGI, 2, TIDAK
    PEREMPUAN, RENDAH, 1, TIDAK
    PEREMPUAN, RENDAH, 2, TIDAK
    PEREMPUAN, TINGGI, 1, TIDAK
    LAKI-LAKI, TINGGI, 1, TIDAK
    LAKI-LAKI, RENDAH, 2, YA
`;

let dataSet, X, Y;

function init() {
    dataSet = [];
    X = [];
    Y = [];
}

function generateForm() {
    let form = document.getElementById('prediction-box');
    for (let i = 0; i < dataSet.length - 1; i++) {
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
        form.appendChild(select);
    }
    let submit = document.createElement('button');
    submit.setAttribute('onclick', 'predict()');
    submit.innerHTML = 'Predict';
    form.appendChild(submit);
}

function processData() {
    for (let i = 0, data = rawData.split('\n');
        i < data.length; i++) {
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
        Y.push(data[i].pop());
        X.push(data[i]);
    }
    generateForm();
}

function predict() {

}

init();