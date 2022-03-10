import { GameEngine } from "./GameEngine.js";
import { AIGameEngine } from "./AIGameEngine.js";
import { Point } from "./Point.js";
import { render } from "./view.js"

// red 1, yellow 1
let _board = [];
let engine, board, search, p1, p2;
let started = false;
let isAI;
let isAiTurn = false;


window.addEventListener("load", function () {
    // get p1 and p2
    p1 = document.getElementById('p1');
    p2 = document.getElementById('p2');
    // get values from search
    search = location.search.split("&");
    // render board
    render();
    // initialize the game logic
    initLogic();
    // get board
    board = document.getElementById("game-board");
    // add on click to column
    document.querySelectorAll('.column').forEach(col => {
        col.addEventListener("click", () => {
            setColor(col.getAttribute("data-x"));
        }); // end event
    }); // end loop

    //button start action
    let btn = document.getElementById("btnStart");
    btn.addEventListener('click', function (e) {
        started = true;
        btn.hidden = true
    }); // end event

}); // end load

function initLogic() {
    // fill 2d array
    initBoardArray();
    // set game engine
    if (getValue('gameMode') === 'individual') {
        isAI = true;
        engine = new AIGameEngine();
        engine.ai_type = getValue('aiType');
    } else {
        isAI = false;
        engine = new GameEngine();
    }
    // set level
    engine.level = Number(getValue('gameLevel'));
    // set names
    p1.innerHTML = getValue('p1');
    if (!isAI){
        p2.innerHTML = getValue('p2');
    }
}

function setColor(col_no) {
    if (started) {
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
            if (isAI && isAiTurn) {
                aiTurn();
            }
        } else {
            showAnimation();
        }
    } else {
        showAnimation();
    }
}

function aiTurn() {
    engine.easyPlay();
    console.log(engine.computer_move)
    setColor(engine.computer_move.col);
}

function showAnimation() {
    board.classList.add('animate');
    setTimeout(() => {
        board.classList.remove('animate');
    }, 500);
}

function initBoardArray() {
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
    //update board in game engine
    engine.board = _board;

    //console.log(engine.checkDiagonal(engine.colors[engine.current_color]));
    if (engine.checkWinner(engine.colors[engine.current_color])) {
        alert(`${engine.colors[engine.current_color]} wins`);
    }
    // change color
    if (engine.current_color === 'red') {
        engine.current_color = 'yellow'
    } else {
        engine.current_color = 'red'
    }
    isAiTurn = !isAiTurn;
}

// to get value from search by key
function getValue(key) {
    for (const searchItem of search) {
        if (searchItem.includes(key)) {
            return searchItem.split('=')[1];
        }
    }
}


