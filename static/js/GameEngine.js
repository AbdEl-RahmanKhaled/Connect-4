import {Point} from "./Point.js";

export class GameEngine {
    #_move;
    #_current_color;
    #_colors = {'red': 1, 'yellow': 2};
    #_board;

    constructor() {
        this.#_current_color = 'red';
    }

    set board(value) {
        this.#_board = value;
    }


    get board() {
        return this.#_board;
    }

    get move() {
        return this.#_move;
    }

    set move(value) {
        this.#_move = value;
    }

    get colors() {
        return this.#_colors;
    }


    get current_color() {
        return this.#_current_color;
    }

    set current_color(value) {
        this.#_current_color = value;
    }

    isDrown() {
        for (let i = 0; i < 7; i++) {
            if (this.#_board[5][i] === 0) {
                return false;
            }
        }
        return true;
    }

    isOutOfBounders(row, col) {
        return row > 5 || col > 6 || row < 0 || col < 0;
    }

    checkDiagonal(color) {
        let target = color.toString() + color.toString() + color.toString() + color.toString() + color.toString();
        let directions = {
            'right': ["++current.row", "++current.col", "--current.row", "--current.col"],
            'left': ["++current.row", "--current.col", "--current.row", "++current.col"]
        }
        for (const direction of ['right', 'left']) {
            let line = "";
            let num_of_movement = 0;
            let current = new Point(this.move.row, this.move.col);
            // move up full right and left
            line += this.board[current.row][current.col];
            // loop while not out of bounders and not the next move not empty and the number of movement less than 4
            while (!this.isOutOfBounders(eval(directions[direction][0]), eval(directions[direction][1])) && this.board[current.row][current.col] !== 0 && num_of_movement <= 4) {
                // append to the line
                line += this.board[current.row][current.col];
                num_of_movement++;
            }
            // move down full left and right
            // reset the current position to the movement position
            current = new Point(this.move.row, this.move.col);
            // reset the movements
            num_of_movement = 0;
            // loop while not out of bounders and not the next move not empty and the number of movement less than 4
            while (!this.isOutOfBounders(eval(directions[direction][2]), eval(directions[direction][3])) && this.board[current.row][current.col] !== 0 && num_of_movement <= 4) {
                // append to the line
                line = this.board[current.row][current.col] + line;
                num_of_movement++;
            }
            console.log(line);
            // return true if generated line for the direction includes the target
            if (line.includes(target)) {
                return true;
            }
        }
        return false;
    }

}