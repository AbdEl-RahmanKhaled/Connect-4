import { GameEngine } from "./GameEngine.js";
import { Point } from "./Point.js";

export class AIGameEngine extends GameEngine {
    #_computer_move = new Point(-1, -1);
    #_ai_type;
    computer_boadr;

    constructor() {
        super();
    }

    get computer_move() {
        return this.#_computer_move;
    }

    get ai_type() {
        return this.#_ai_type;
    }

    set ai_type(value) {
        this.#_ai_type = value;
    }

    getBestMove(board_) {
        let bestVal = -Infinity;
        console.log("inside get best move and board : " + board_)
        let bestMove = new Point(-1, -1);
        // Traverse all cloumns, evaluate minimax function
        // for all empty columns. And return the spot
        // with optimal value.   // Check if cell is empty
        this.easyPlay();
        console.log(`i and j = ${this.#_computer_move.row} ${this.#_computer_move.col}`)
        // Make the move
        board_[j][i] = 2;
        this.move = this.#_computer_move;
        // compute evaluation function for this
        let moveVal = this.minimax(board_, 0, false);
        // Undo the move
        board_[j][j] = 0;
        console.log(`move undo i and j = ${i} ${j}`);

        // If the value of the current move is
        // more than the best value, then update
        // best
        if (moveVal > bestVal) {
            bestMove.row = i;
            bestMove.col = j;
            bestVal = moveVal;
        }


        console.log("board after get best move : " + this.board)


        this.#_computer_move = bestMove;
    }

    minimax(board, depth, isMaximizing) {
        // If Maximizer or maximizer has won the game
        // return evaluated score
        console.log(`Depth = ${depth}`)
        if (this.checkWinner(2, board) === true) {
            return 10;
        }
        else if (this.checkWinner(1, board) === true) {
            return -10;
        }
        // If there are no more moves and
        // no winner then it is a tie
        else if (this.isDraw(board) === true || depth === 20) {
            return 0;
        }


        if (isMaximizing) {
            let best = -Infinity;
            for (let i = 0; i < 7; i++) {
                let j = this.selectRow(board, i);
                if (j !== -1) {
                    board[j][i] = 2;
                    this.move = new Point(j, i);
                    console.log(`maximize move = ${this.move} `)
                    best = Math.max(best, this.minimax(board, depth + 1, false));
                    board[j][i] = 0;
                }
            }
            return best;
        }
        else {
            let bestInMinimize = Infinity;
            // Traverse all cells
            for (let i = 0; i < 7; i++) {
                let j = this.selectRow(board, i);
                if (j !== -1) {
                    board[j][i] = 1;
                    this.move = new Point(j, i);
                    console.log(`minimize move = ${this.move} `)
                    bestInMinimize = Math.min(bestInMinimize, this.minimax(board, depth + 1, true));
                    board[j][i] = 0;
                }
            }
            return bestInMinimize;
        }
    }



    getAvailablePlaces() {
        let points = [];
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                ssss
                if (!this.board[i][j]) {
                    points.push(new Point(i, j));
                }
            }
        }
        return points;
    }

    selectRow(board, col_no) {
        if (board[5][col_no] !== 0) {
            return -1;
        }
        for (let i = 0; i < 6; i++) {
            if (board[i][col_no] === 0) return i;
        }
    }

    easyPlay() {
        let generatedCol = -1;
        let generatedRow = -1;
        do {
            generatedCol = Math.floor(Math.random() * 7);
            generatedRow = this.selectRow(this.board, generatedCol);
        }
        while (generatedRow === -1)
        //console.log(`Selected ${generatedRow} and ${generatedCol}`)
        this.#_computer_move = new Point(generatedRow, generatedCol);
    }

}