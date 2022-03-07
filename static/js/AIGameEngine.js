import {GameEngine} from "./GameEngine.js";
import {Point} from "./Point.js";

export class AIGameEngine extends GameEngine {
    #_computer_move;
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
                if (! this.board[i][j]) {
                    points.push(new Point(i, j));
                }
            }
        }
        return points;
    }
    
    getRow(col_no){

        if(this.board[5][col_no] != 0){
            return false;
        }
        return true;
    }


    getEasyPlay(){
        let generatedCol;
        do{
          generatedCol = Math.floor(Math.random() * 7);
        }
        while(this.getRow())

        return generatedCol;
    }

}