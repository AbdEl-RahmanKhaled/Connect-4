window.addEventListener('load', ev => {
    let aiImg = document.getElementById("aiImg");
    let userImg = document.getElementById("userImg");

    let easyImg = document.getElementById("easyImg");
    let hardImg = document.getElementById("hardImg");

    let basicImg = document.getElementById("basicImg");
    let midImg = document.getElementById("midImg");
    let smartImg = document.getElementById("smartImg");

    let aiModeDiv = document.getElementById("divAi");

    let txtPlayer2 = document.getElementById("txtPlayer2");

    txtPlayer2.hidden = true;

    document.querySelectorAll("input[name='gameMode']").forEach(value1 => {
        value1.addEventListener('change', change_mode);
    });// end selector

    document.querySelectorAll("input[name=gameLevel]").forEach(value2 => {
        value2.addEventListener('change', change_level);
    }); // end selector

    document.querySelectorAll("input[name='aiType']").forEach(value3 => {
        value3.addEventListener('change', change_ai_mode);
    }); // end selector

    function change_mode(e1) {
        if (e1.target.value === "multi") {
            aiImg.classList.remove('selected');
            userImg.classList.add('selected');
            txtPlayer2.hidden = false;
            aiModeDiv.hidden = true;
        } else {
            userImg.classList.remove('selected');
            aiImg.classList.add('selected');
            txtPlayer2.hidden = true;
            aiModeDiv.hidden = false;
        }
    }

    function change_level(e2) {
        if (e2.target.value === '1') {
            easyImg.classList.add('selected');
            hardImg.classList.remove('selected');
        } else {
            hardImg.classList.add('selected');
            easyImg.classList.remove('selected');
        }
    }

    function change_ai_mode(e3) {
        console.log(e3.target.value);
        if (e3.target.value === 'basic') {
            basicImg.classList.add('selected');
            midImg.classList.remove('selected');
            smartImg.classList.remove('selected');
        } else if (e3.target.value === 'mid') {
            basicImg.classList.remove('selected');
            midImg.classList.add('selected');
            smartImg.classList.remove('selected');
        } else {
            basicImg.classList.remove('selected');
            midImg.classList.remove('selected');
            smartImg.classList.add('selected');
        }
    }

}); // end load

