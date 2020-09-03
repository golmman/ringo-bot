const { stdin } = process;

function startIslandSurvey() {
    for (let k = 0; k < 256; k += 1) {
        const binary = Number(k).toString(2);
        console.log(binary);


    }
}

let index = 0;
const islands = new Array(256);

function printVicinity(vicinityString) {
    const a = vicinityString.split('');

    console.log(`${a[0]}${a[1]}${a[2]}`);
    console.log(`${a[3]} ${a[4]}`);
    console.log(`${a[5]}${a[6]}${a[7]}`);
}

function convertToBinaryFixed8(number) {
    const b = Number(index).toString(2);

    return `${'0'.repeat(8 - b.length)}${b}`;
}

function printGui() {
    console.log('-------------------------------------------------------');
    console.log();
    console.log(`Index: ${index}`);
    console.log();

    const binaryFixed8 = convertToBinaryFixed8(index);
    printVicinity(binaryFixed8);

    console.log();
    console.log("Results in island? l - yes, ; - no, ' - back");
    console.log(`last answer: ${islands[index]}`);
    console.log();
}

printGui();

stdin.on('data', (data) => {
    const response = data.toString();

    if (response.startsWith('l')) {
        islands[index] = true;
        index += 1;
    }

    if (response.startsWith(';')) {
        islands[index] = false;
        index += 1;
    }

    if (response.startsWith("'")) {
        index -= 1;
    }

    if (index < 0) {
        index = 255;
    }

    if (index > 255) {
        index = 0;
    }

    printGui();
});
