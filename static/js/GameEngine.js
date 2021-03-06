import { Point } from "./Point.js";

export class GameEngine {
    #_move;
    #_current_color;
    #_colors = { red: '1', yellow: '2' };
    #_board;
    #_level;

    constructor() {
        this.#_current_color = "red";
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

    get level() {
        return this.#_level;
    }

    set level(value) {
        this.#_level = value;
    }

    get current_color() {
        return this.#_current_color;
    }

    set current_color(value) {
        this.#_current_color = value;
    }

    isDraw(board) {
        for (let i = 0; i < 7; i++) {
            if (board[5][i] === 0) {
                return false;
            }
        }
        return true;
    }

    isOutOfBounders(row, col) {
        return row > 5 || col > 6 || row < 0 || col < 0;
    }

    checkWinner(color, board) {
        console.log(`Inside check winnder move : ${this.move.row} ${this.move.col}`)
        // if (board !== undefined) this.#_board = board;

        if (this.#_level === 1) {
            return this.checkStraight(color, 4, board);
        } else {
            return (this.checkDiagonal(color, board) || this.checkStraight(color, 5, board));
        }
    }

    checkDiagonal(color, board) {
        let target = color.toString().repeat(5);
        let directions = {
            right: ["++current.row", "++current.col", "--current.row", "--current.col"],
            left: ["++current.row", "--current.col", "--current.row", "++current.col"]
        };

        for (const direction of ["right", "left"]) {
            let line = "";
            let num_of_movement = 0;
            let current = new Point(this.move.row, this.move.col);
            // move up full right and left
            line += board[current.row][current.col];
            // loop while not out of bounders and not the next move not empty and the number of movement less than 4
            while (!this.isOutOfBounders(eval(directions[direction][0]), eval(directions[direction][1])) &&
                board[current.row][current.col] !== 0 &&
                num_of_movement <= 4) {
                // append to the line
                line += board[current.row][current.col];
                num_of_movement++;
            }

            if (line.includes(target)) return true;
            // reset the current position to the movement position and movements
            current = new Point(this.move.row, this.move.col);

            num_of_movement = 0;
            // loop while not out of bounders and not the next move not empty and the number of movement less than 4
            while (!this.isOutOfBounders(eval(directions[direction][2]), eval(directions[direction][3])) &&
                board[current.row][current.col] !== 0 &&
                num_of_movement <= 4) {
                // append to the line
                line = board[current.row][current.col] + line;
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
    // checkDiagonal(color) {
    //     let target = color.toString().repeat(5);
    //     let directions = {
    //         right: ["++current.row", "++current.col", "--current.row", "--current.col"],
    //         left: ["++current.row", "--current.col", "--current.row", "++current.col"]
    //     };

    //     for (const direction of ["right", "left"]) {
    //         let line = "";
    //         let num_of_movement = 0;
    //         let current = new Point(this.move.row, this.move.col);
    //         // move up full right and left
    //         line += this.board[current.row][current.col];
    //         // loop while not out of bounders and not the next move not empty and the number of movement less than 4
    //         while (!this.isOutOfBounders(eval(directions[direction][0]), eval(directions[direction][1])) &&
    //             this.board[current.row][current.col] !== 0 &&
    //             num_of_movement <= 4) {
    //             // append to the line
    //             line += this.board[current.row][current.col];
    //             num_of_movement++;
    //         }

    //         if (line.includes(target)) return true;
    //         // reset the current position to the movement position and movements
    //         current = new Point(this.move.row, this.move.col);

    //         num_of_movement = 0;
    //         // loop while not out of bounders and not the next move not empty and the number of movement less than 4
    //         while (!this.isOutOfBounders(eval(directions[direction][2]), eval(directions[direction][3])) &&
    //             this.board[current.row][current.col] !== 0 &&
    //             num_of_movement <= 4) {
    //             // append to the line
    //             line = this.board[current.row][current.col] + line;
    //             num_of_movement++;
    //         }
    //         console.log(line);
    //         // return true if generated line for the direction includes the target
    //         if (line.includes(target)) {
    //             return true;
    //         }
    //     }

    //     return false;
    // }

    checkStraight(color, size, board) {
        let target = color.toString().repeat(size);

        let directions = {
            row: ["++current.row", "current.col", "--current.row", "current.col"],
            col: ["current.row", "++current.col", "current.row", "--current.col"],
        };

        for (const direction of ["row", "col"]) {
            let num_of_movement = 0;
            let current = new Point(this.move.row, this.move.col);
            let line = board[current.row][current.col].toString();

            while (!this.isOutOfBounders(eval(directions[direction][0]), eval(directions[direction][1])) &&
                num_of_movement <= 4 &&
                board[current.row][current.col] !== 0) {
                // append to the line
                //console.log("append in first while")
                line += board[current.row][current.col];
                num_of_movement++;
            }
            //console.log(`Line Value: ${line}`);
            if (line.includes(target)) return true;

            // reset the movements and current point
            num_of_movement = 0;
            current = new Point(this.move.row, this.move.col);


            // loop while not out of bounders and not the next move not empty and the number of movement less than 4
            while (!this.isOutOfBounders(eval(directions[direction][2]), eval(directions[direction][3])) &&
                num_of_movement <= 4 &&
                board[current.row][current.col] !== 0) {
                // append to the line
                //console.log("append in second while")
                line = board[current.row][current.col] + line;
                num_of_movement++;
            }
            //console.log(line);
            if (line.includes(target)) return true;
        }
        return false;
    }

    // checkStraight(color, size) {
    //     let target = color.toString().repeat(size);

    //     let directions = {
    //         row: ["++current.row", "current.col", "--current.row", "current.col"],
    //         col: ["current.row", "++current.col", "current.row", "--current.col"],
    //     };

    //     for (const direction of ["row", "col"]) {
    //         let num_of_movement = 0;
    //         let current = new Point(this.move.row, this.move.col);
    //         let line = this.board[current.row][current.col].toString();

    //         while (!this.isOutOfBounders(eval(directions[direction][0]), eval(directions[direction][1])) &&
    //             num_of_movement <= 4 &&
    //             this.board[current.row][current.col] !== 0) {
    //             // append to the line
    //             //console.log("append in first while")
    //             line += this.board[current.row][current.col];
    //             num_of_movement++;
    //         }
    //         //console.log(`Line Value: ${line}`);
    //         if (line.includes(target)) return true;

    //         // reset the movements and current point
    //         num_of_movement = 0;
    //         current = new Point(this.move.row, this.move.col);


    //         // loop while not out of bounders and not the next move not empty and the number of movement less than 4
    //         while (!this.isOutOfBounders(eval(directions[direction][2]), eval(directions[direction][3])) &&
    //             num_of_movement <= 4 &&
    //             this.board[current.row][current.col] !== 0) {
    //             // append to the line
    //             //console.log("append in second while")
    //             line = this.board[current.row][current.col] + line;
    //             num_of_movement++;
    //         }
    //         //console.log(line);
    //         if (line.includes(target)) return true;
    //     }
    //     return false;
    // }

}