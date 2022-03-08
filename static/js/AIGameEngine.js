import { GameEngine } from "./GameEngine.js";
import { Point } from "./Point.js";

export class AIGameEngine extends GameEngine {
    #_computer_move = new Point(-1,-1);
    #_ai_type;

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

    getAvailablePlaces() {
        let points = [];
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (!this.board[i][j]) {
                    points.push(new Point(i, j));
                }
            }
        }
        return points;
    }

    easyPlay() {
        
        let generatedCol;
        let generatedRow;
        do {
            generatedCol = Math.floor(Math.random() * 7);
            generatedRow = selectRow(generatedCol);
        }
        while (generatedRow === -1)
        console.log(`Selected ${generatedRow} and ${generatedCol}`)

        this.#_computer_move.row(generatedRow);
        this.#_computer_move.col(generatedCol);
    }

    selectRow(col_no) {

        if (this.board[5][col_no] != 0) {
            return -1;
        }
        for (let i = 0; i < 6; i++) {
            if (this.board[i][col_no] == 0) return i;
        }
      
    }

}