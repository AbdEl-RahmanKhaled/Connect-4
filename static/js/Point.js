export class Point {
    #_row;
    #_col;


    constructor(row, col) {
        this.#_row = row;
        this.#_col = col;
    }

    get row() {
        return this.#_row;
    }

    set row(value) {
        this.#_row = value;
    }

    get col() {
        return this.#_col;
    }

    set col(value) {
        this.#_col = value;
    }
}