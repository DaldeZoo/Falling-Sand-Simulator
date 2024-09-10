// TODO: Make the grid a 1D array... index=j*width+i
// TODO: Add gravity
// This is in grid[column][row] notation

const width = 500;
const height = 500;
let grid;
let cellSize;
let columns;
let rows;

function new2DArray(columns, rows) {
    let arr = new Array(columns);
    for (let i=0; i<columns; i++) arr[i] = new Array(rows).fill(0);
    return arr;
}

function drawGrid(grid) {
    noStroke();
    for (let j=0; j<rows; j++) {
        for (let i=0; i<columns; i++) {
            if (grid[i][j] === 1) {
                fill(255);
                square(i*cellSize, j*cellSize, cellSize);
            }
        }
    }
}

function drawNextGrid(nextGrid) {
    for (let j=0; j<rows; j++) {
        for (let i=0; i<columns; i++) {
            if (j+1 < rows) {
                if (grid[i][j] === 1) {
                    if (grid[i][j+1] === 0) nextGrid[i][j+1] = 1;
                    else {
                        if (i+1 < columns && i-1 >= 0) {
                            let direction = random([-1, 1]);
                            if (grid[i+direction][j+1] === 0) nextGrid[i+direction][j+1] = 1;
                            else if (grid[i-direction][j+1] === 0) nextGrid[i-direction][j+1] = 1;
                            else nextGrid[i][j] = 1;
                        }
                        if (i+1 < columns && grid[i+1][j+1] === 0) nextGrid[i+1][j+1] = 1;
                        else if (i-1 >= 0 && grid[i-1][j+1] === 0) nextGrid[i-1][j+1] = 1;
                        else nextGrid[i][j] = 1;
                    }
                }
            }
            else if (grid[i][j] === 1) nextGrid[i][j] = 1;
        }
    }
}

function setup() {
    createCanvas(width, height);
    cellSize = 5;
    columns = width/cellSize;
    rows = height/cellSize;
    grid = new2DArray(columns, rows);
}

function draw() {
    background(0);
    drawGrid(grid);
    let nextGrid = new2DArray(columns, rows);
    drawNextGrid(nextGrid);
    grid = nextGrid;

    if (mouseIsPressed) {
        let mouseI = floor(mouseX/cellSize);
        let mouseJ = floor(mouseY/cellSize);
        let sandAmount = 5;
        let bounds = floor(sandAmount/2);
        if (sandAmount > 1) {
            for (let j=-bounds; j<bounds; j++) {
                for (let i=-bounds; i<bounds; i++) {
                    if (random(1) < 0.75) {
                        let col = mouseI+i;
                        let row = mouseJ+j;
                        if (col >= 0 && col < columns && row >= 0 && row < rows)
                            if (grid[col][row] === 0) grid[col][row] = 1;
                    }
                }
            }
        }
        else if (mouseI >= 0 && mouseI < columns && mouseJ >= 0 && mouseJ < rows) 
            if (grid[mouseI][mouseJ] === 0) grid[mouseI][mouseJ] = 1;
    }
}