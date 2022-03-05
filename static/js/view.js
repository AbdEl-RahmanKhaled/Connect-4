window.addEventListener("load", ev => {
    render()
});

function render() {
    let board = document.getElementById("game-board");
    for (let col = 0; col < 7; col++) {
        let col_div = `<div class="column" id="column-${col}" data-x="${col}"></div>`;
        board.innerHTML += col_div;
        col_div = document.getElementById("column-" + col);

        for (let row = 5; row >= 0; row--) {
            let cir = `<svg height="100" width="100" class="row-${row}">
                             <circle cx="50" cy="50" r="40" stroke="#0B4E72" stroke-width="3" class="free" /></svg>`;
            col_div.innerHTML += cir;
        }
    }
}

function render_board() {
    let board = document.getElementById("game-board");
    for (let col = 0; col < 7; col++) {
        let col_div = document.createElement("div");
        col_div.classList.add("column");
        col_div.id = "column-" + col;
        col_div.setAttribute("data-x", col.toString());

        for (let row = 0; row < 6; row++) {
            let svg = document.createElement("svg");
            let cir = document.createElement("circle");

            svg.offsetHeight = 100;
            svg.offsetWidth = 100;
            // svg.setAttribute("width", "100");
            svg.setAttribute("class", "row-" + row)

            cir.setAttribute("cx", "50");
            cir.setAttribute("cy", "50");
            cir.setAttribute("r", "40");
            cir.setAttribute("stroke", "#0B4E72");
            cir.setAttribute("stroke-width", "3");

            cir.classList.add("free");

            svg.appendChild(cir);
            col_div.appendChild(svg);
        }
        board.appendChild(col_div);
    }
}