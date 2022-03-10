import {GameEngine} from "./GameEngine.js";
import {AIGameEngine} from "./AIGameEngine.js";
import {Point} from "./Point.js";
import {render} from "./view.js"

// red 1, yellow 1
let _board = [];
let engine, board, search, p1, p2, dialog_prev_data, dialog_result, btn_show_prev, btn_close, res_msg, time, prev_p1,
    prev_p2, prev_res;
let started = false;
let isAI;
let isAiTurn = false;


window.addEventListener("load", function () {
    // select some html elements
    board = document.getElementById("game-board");
    p1 = document.getElementById('p1');
    p2 = document.getElementById('p2');
    dialog_prev_data = document.getElementById('dialog-prev');
    dialog_result = document.getElementById('dialog-result');
    btn_show_prev = document.getElementById('show-prev');
    btn_close = document.getElementById('btnClose');
    res_msg = document.getElementById('game-result-msg');
    time = document.getElementById('time');
    prev_p1 = document.getElementById('op1');
    prev_p2 = document.getElementById('op2');
    prev_res = document.getElementById('ores');

    // get values from search
    search = location.search.split("&");

    // render board
    render();
    // initialize the game logic
    initLogic();

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
        saveNewData();
    }); // end event

    // button show prev game data
    btn_show_prev.addEventListener('click', ev => {
        showDialog(dialog_prev_data);
    });

    // close btn on dialog
    btn_close.addEventListener('click', ev => {
        dialog_prev_data.classList.add('hide-dialog');
        dialog_prev_data.classList.remove('dialog-cont');
    });

    document.getElementById('btnRePlay').addEventListener('click', ev => {
        location.reload();
    });

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
    if (!isAI) {
        p2.innerHTML = getValue('p2');
    }
    // load data from local storage
    loadSaved();
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
    // engine.getBestMove(Array.from(engine.board));
    engine.easyPlay();
    console.log("main board : " + _board)
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
    engine.board = Array.from(_board);

    //console.log(engine.checkDiagonal(engine.colors[engine.current_color]));
    if (engine.checkWinner(engine.colors[engine.current_color], engine.board)) {
        showGameResult(engine.current_color);
    } else if (engine.isDraw(engine.board)) {
        showGameResult('draw');
    }
    // change color
    if (engine.current_color === 'red') {
        engine.current_color = 'yellow'
    } else {
        engine.current_color = 'red'
    }
    isAiTurn = !isAiTurn;
}

function showGameResult(result) {
    let res;
    if (result !== 'draw') {
        res = getValue('p' + engine.colors[result]);
        res_msg.innerHTML = `<span class="color_${result}">${res}</span> Won !`
        res += ' Won';
    } else {
        res_msg.innerHTML = `Draw !`
        res = 'Draw'
    }
    window.localStorage.setItem('status', res);
    showDialog(dialog_result)

}

function saveNewData() {
    window.localStorage.setItem('date', new Date().toLocaleDateString())
    window.localStorage.setItem('p1', getValue('p1'));
    window.localStorage.setItem('p2', getValue('p2'));
    window.localStorage.setItem('status', 'Not Completed');
}

function loadSaved() {
    prev_p1.innerHTML = window.localStorage.getItem('p1');
    prev_p2.innerHTML = window.localStorage.getItem('p2');
    time.innerHTML = window.localStorage.getItem('date');
    prev_res.innerHTML = window.localStorage.getItem('status');
    if (window.localStorage.getItem('status').includes(window.localStorage.getItem('p1'))) {
        prev_res.className = 'color_red';
    } else if (window.localStorage.getItem('status').includes(window.localStorage.getItem('p2'))) {
        prev_res.className = 'color_yellow';
    } else {
        prev_res.className = '';
    }
}

function showDialog(d) {
    d.classList.remove('hide-dialog');
    d.classList.add('dialog-cont');
}

// to get value from search by key
function getValue(key) {
    for (const searchItem of search) {
        if (searchItem.includes(key)) {
            return searchItem.split('=')[1];
        }
    }
}


