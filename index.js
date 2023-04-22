const inquirer = require('inquirer');
const fs = require('fs');

function generateSVG(data) {
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200">`;

    if (data.shape === 'circle') {
        svg += `<circle cx="150" cy="100" r="50" fill="${data.shapeColor}"/>`;
    } else if (data.shape === 'triangle') {
        svg += `<polygon points="150,50 100,150 200,150" fill="${data.shapeColor}"/>`;
    } else {
        svg += `<rect x="50" y="50" width="200" height="100" fill="${data.shapeColor}"/>`;
    }

    const textX = data.shape === 'triangle' ? 150 : 100;
    const textY = data.shape === 'circle' ? 105 : 80;
    svg += `<text x="${textX}" y="${textY}" text-anchor="middle" fill="${data.textColor}" font-size="72">${data.text}</text></svg>`;

    return svg;
}

function writeSVGFile(svg, filename) {
    fs.writeFile(`${filename}.svg`, svg, function (err) {
        if (err) throw err;
        console.log('Generated ' + filename + '.svg');
    });
}

inquirer.prompt([
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters:',
        validate: (input) => input.length <= 3,
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter text color (keyword or hexadecimal number):',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square'],
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter shape color (keyword or hexadecimal number):',
    },
    {
        type: 'input',
        name: 'filename',
        message: 'Enter the name of the SVG file to create (without .svg extension):',
    },
])
    .then((answers) => {
        const svg = generateSVG(answers);
        writeSVGFile(svg, answers.filename);
    });
