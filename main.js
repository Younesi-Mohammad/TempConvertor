function f2c() {
    var far = document.getElementById('faren').value;
    var cel = document.getElementById('cel');
    var celsi = (far-32) / 1.8;
    celsi = (Math.round(celsi * 100) / 100).toFixed(2);

    $(document.getElementById('avg')).attr('disabled', false);
    var area = document.getElementById('entries');
    var lineCount = countline();
    if(lineCount < 10){
        cel.value = celsi;
        area.value += "" + far + "     " + celsi + "\n";
    }else{
        cel.value = "";
    }
    if(lineCount===9){
        avg();
    }

    document.getElementById("faren").value = "";
    document.getElementById("faren").focus();
}

function countline() {
    var lineCount = 0;
    var area = document.getElementById('entries');
    var lines = area.value.split("\n");
    var nums;

    for (var i = 0; i < lines.length; i++) {
        if (lines[i].length > 0) lineCount++;
        //console.log(lines[i]);

        nums = lines[i].split("     ");
        //console.log(nums[0]);
        //console.log(nums[1]);
    }
    //console.log(lineCount);
    return lineCount;
}

function avg() {

    var faren_avg = 0.00;
    var cel_avg = 0.00;

    var area = document.getElementById('entries');
    var lines = area.value.split("\n");
    var numbers;

    for (var i = 0; i < lines.length-1; i++) {
        //console.log(lines[i]);
        numbers = lines[i].split("     ");
        //console.log(numbers[0]);
        //console.log(numbers[1]);
        faren_avg +=  parseFloat( numbers[0]);
        cel_avg += parseFloat( numbers[1]);
    }

    var n = countline();
    //console.log(n);

    faren_avg = (faren_avg / n).toFixed(2);
    cel_avg = (cel_avg / n).toFixed(2);

    area.value += "============================\n";
    area.value += "\n";
    area.value += "" + faren_avg + "     " + cel_avg + "\n";

    $(document.getElementById('avg')).attr('disabled', true);
    $(document.getElementById('conv')).attr('disabled', true);
    document.getElementById('rst').style.visibility="visible";
}

function erase() {
    document.getElementById("entries").value = "";
    document.getElementById("faren").value = "";
    document.getElementById("cel").value = "";
    document.getElementById("faren").focus();

    document.getElementById('rst').style.visibility="hidden";
}

$(document).ready(function() {
    $(document.getElementById("avg")).attr('disabled', true);
    $(document.getElementById("conv")).attr('disabled', true);

    $(document.getElementById("faren")).on('keyup',function() {
        var textarea_value = (document.getElementById("entries")).value;

        if(textarea_value != '') {
            $(document.getElementById('avg')).attr('disabled', false);
        } else {
            $(document.getElementById('avg')).attr('disabled', true);
        }
    });

    $(document.getElementById("faren")).on('keyup',function() {

        if(document.getElementById("faren").checkValidity() && document.getElementById("faren").value != "") {
            $(document.getElementById('conv')).attr('disabled', false);
        } else {
            $(document.getElementById('conv')).attr('disabled', true);
        }
    });

    if(document.getElementById('faren')){
        document.getElementById('faren').addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                // Trigger the button element with a click
                if(document.getElementById("faren").checkValidity() && document.getElementById("faren").value != ""){
                    document.getElementById("conv").click();
                }
            }
        });

    }
});
