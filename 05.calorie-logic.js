document.getElementById("calc-btn-2").addEventListener("click", calculateRDI);

function calculateRDI() {
    const gender = document.getElementById("gender").value;
    const age = parseFloat(document.getElementById("age").value);
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const activityFactor = parseFloat(document.getElementById("activity").value);
    const goalAdjustment = parseFloat(document.getElementById("goal").value);

    const goalText = document.getElementById("goal").options[document.getElementById("goal").selectedIndex].text;


    if (isNaN(age) || isNaN(height) || isNaN(weight) || age <= 0 || height <= 0 || weight <= 0) {
        document.getElementById("result-display").innerText = "Error";
        document.getElementById("goal-text").innerText = "Please fill all fields";
        return;
    }

    // BMR calc using Mifflin-St Jeor formula
    // Female: BMR = 10 * weight (kg) + 6.25 * height (cm) - 5 * age (years) - 161
    // Male: BMR = 10 * weight (kg) + 6.25 * height (cm) - 5 * age (year) + 5
    let bmr;
    if (gender === "female") {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }

    // tdee = total daily energy expenditure
    const tdee = bmr * activityFactor;

    const rdi = tdee + goalAdjustment;

    // print the result
    if (rdi > 0) {
        document.getElementById("result-display").innerText = Math.round(rdi).toLocaleString("en-US");
        document.getElementById("goal-text").innerText = "Goal: " + goalText;
    } else {
        document.getElementById("result-display").innerText = "Error";
        document.getElementById("goal-text").innerText = "Result too low or calculation failed";
    }
}