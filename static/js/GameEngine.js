
export class GameEngine {
    #_board;
    #_move;

    constructor() {
    }

    set board(value) {
        this.#_board = value;
    }


    get move() {
        return this.#_move;
    }

    set move(value) {
        this.#_move = value;
    }

    isDrown() {
        for (let i = 0; i < 7; i++) {
            if (this.#_board[5][i] === 0) {
                return false;
            }
        }
        return true;
    }

}