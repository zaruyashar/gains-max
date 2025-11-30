const calculateBtn = document.getElementById("calc-btn");

calculateBtn.addEventListener("click", function () {

    const weight = parseFloat(document.getElementById("youLifted").value);
    const reps = parseInt(document.getElementById("repCount").value);

    const unitElement = document.querySelector('input[name="radioOptions"]:checked');
    if (unitElement) {
        if (unitElement.id === "radioLb") {
            unitText = "lb";
        } else {
            unitText = "kg";
        }
    }

    if (isNaN(weight) || isNaN(reps) || reps === 0 || weight <= 0) {
        document.getElementById("result-text").innerText = "Error";
        document.getElementById("unit-text").innerText = "";
        return;
    }


    // Formula: weight / ( 1.0278 – 0.0278 × reps )
    const oneRepMax = weight / (1.0278 - (0.0278 * reps));

    document.getElementById("result-text").innerText = Math.round(oneRepMax);
    document.getElementById("unit-text").innerText = unitText;
});