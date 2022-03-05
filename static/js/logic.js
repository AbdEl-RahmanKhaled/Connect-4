let current_color = 'red';

window.addEventListener("load", function () {
    // select all columns
    let cols = document.querySelectorAll('.column');
    // add on click to column
    cols.forEach(col => {
        col.addEventListener("click", () => {
            setColor(col.getAttribute("data-x"));
        }); // end event
    }); // end loop
}); // end load


function setColor(col_no) {
    // get all free places in the column
    let free_rows = document.querySelectorAll("#column-" + col_no + "> svg > .free");
    // check if there are free places
    if (free_rows.length > 0) {
        // get the next row
        let row = free_rows[free_rows.length - 1];
        // remove indicator
        row.classList.remove("free");
        // set current color
        row.classList.add(current_color);
        // change the color
        changeColor();
    } else {
        alert("no more free spaces")
    }
}

function changeColor() {
    if (current_color === 'red') {
        current_color = 'yellow'
    } else {
        current_color = 'red'
    }
}



