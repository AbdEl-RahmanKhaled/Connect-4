import {GameEngine} from "./GameEngine.js";
import {Point} from "./Point.js";

export class AIGameEngine extends GameEngine {
    #_computer_move;
    #_level;

    constructor() {
        super();
    }

    get computer_move() {
        return this.#_computer_move;
    }

    get level() {
        return this.#_level;
    }

    set level(value) {
        this.#_level = value;
    }

    getAvailablePlaces() {
        let points = [];
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (!this.#_board[i][j]) {
                    points.push(new Point(i, j));
                }
            }
        }
        return points;
    }

    easy(){

    }

}