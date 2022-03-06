export class GameEngine {
    #_move;
    #_current_color;
    #_colors = {'red': 1, 'yellow': 2};
    #_board;

    constructor() {
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

    checkDiagonal() {

    }

}