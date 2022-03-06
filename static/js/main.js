import {GameEngine} from "./GameEngine.js";
import {Point} from "./Point.js";
import {render} from "./view.js"
import {AIGameEngine} from "./AIGameEngine.js";

// let colors = {'red': 1, 'yellow': 2};
// let current_color = 'red';
let _board = [];
let engine = new AIGameEngine();

// red 1, yellow 1

window.addEventListener("load", function () {
    render();
    init_board();
    // select all columns
    let cols = document.querySelectorAll('.column');
    // add on click to column
    cols.forEach(col => {
        col.addEventListener("click", () => {
            setColor(col.getAttribute("data-x"));
        }); // end event
    }); // end loop
}); // end load


function setColor(col_no) {
    // get all free places in the column
    let free_rows = document.querySelectorAll("#column-" + col_no + "> svg > .free");
    // check if there are free places
    if (free_rows.length > 0) {
        // get the next row
        let row = free_rows[free_rows.length - 1];
        // remove indicator
        row.classList.remove("free");
        // set current color
        row.classList.add(engine.current_color);
        // set current move
        engine.move = new Point(row.getAttribute("data-y"), col_no);
        // change the turn
        changeTurn();
    } else {
        alert("no more free spaces")
    }
}

function init_board() {
    // initialize 2d array board
    for (let i = 0; i < 6; i++) {
        _board[i] = new Array(7);
        for (let j = 0; j < 7; j++) {
            _board[i][j] = 0;
        }
    }
}

function changeTurn() {
     _board[engine.move.row][engine.move.col] = engine.colors[engine.current_color];
     // update board in game engine
    engine.board = _board;
    console.log(engine.checkDiagonal(engine.colors[engine.current_color]));

    // change color
    if (engine.current_color === 'red') {
        engine.current_color = 'yellow'
    } else {
        engine.current_color = 'red'
    }
}



