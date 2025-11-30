// --- 1. HANDLE GENDER SWITCH (JQUERY FIX) ---
$(document).ready(function () {

    // Listen for change on the radio inputs
    $('input[name="genderOptions"]').change(function () {
        // Check if Female is selected
        if ($('#gender-female').is(':checked')) {
            // Show Hips
            $('.hip-input-group').slideDown();
        } else {
            // Hide Hips
            $('.hip-input-group').slideUp();
        }
    });

    // Initialize state on page load
    // This ensures if you refresh and the browser remembers "Female", the inputs show up.
    $('input[name="genderOptions"]:checked').trigger('change');
});


// --- 2. THE CALCULATION LOGIC ---
document.getElementById('calc-btn').addEventListener('click', function () {

    // Determine Gender
    let isMale = document.getElementById('gender-male').checked;
    let gender = isMale ? 'male' : 'female';

    // Determine Unit (Metric vs Imperial)
    let isMetric = document.getElementById('tab-metric-link').classList.contains('active');
    let unit = isMetric ? 'cm' : 'in';

    let height, neck, waist, hip;

    // Fetch values based on active tab
    if (isMetric) {
        height = parseFloat(document.getElementById('m-height').value);
        neck = parseFloat(document.getElementById('m-neck').value);
        waist = parseFloat(document.getElementById('m-waist').value);
        hip = parseFloat(document.getElementById('m-hip').value);
    } else {
        height = parseFloat(document.getElementById('i-height').value);
        neck = parseFloat(document.getElementById('i-neck').value);
        waist = parseFloat(document.getElementById('i-waist').value);
        hip = parseFloat(document.getElementById('i-hip').value);
    }

    // --- CONVERT IMPERIAL TO METRIC FOR FORMULA ---
    if (unit === 'in') {
        height = height * 2.54;
        neck = neck * 2.54;
        waist = waist * 2.54;
        hip = hip * 2.54;
    }

    let bf = 0;
    let isValid = true;

    // Basic validation
    if (!height || !neck || !waist) isValid = false;

    if (gender === 'female' && !hip) isValid = false;

    if (!isValid) {
        document.getElementById('result-display').innerText = "--";
        document.getElementById('category-text').innerText = "Please fill all fields";
        return;
    }

    // --- NAVY METHOD FORMULA ---
    if (gender === 'male') {
        // MEN
        if ((waist - neck) > 0) {
            bf = (86.010 * Math.log10(waist - neck)) - (70.041 * Math.log10(height)) + 36.76;
        }
    } else {
        // WOMEN
        if ((waist + hip - neck) > 0) {
            bf = (163.205 * Math.log10(waist + hip - neck)) - (97.684 * Math.log10(height)) - 78.387;
        }
    }

    // Display Result
    if (bf > 0) {
        let finalBF = bf.toFixed(1);
        document.getElementById('result-display').innerText = finalBF + "%";

        // Categories
        let category = "";
        if (gender === 'male') {
            if (bf < 6) category = "Essential Fat";
            else if (bf < 14) category = "Athletes";
            else if (bf < 18) category = "Fitness";
            else if (bf < 25) category = "Average";
            else category = "Obese";
        } else {
            if (bf < 14) category = "Essential Fat";
            else if (bf < 21) category = "Athletes";
            else if (bf < 25) category = "Fitness";
            else if (bf < 32) category = "Average";
            else category = "Obese";
        }
        document.getElementById('category-text').innerText = category;

    } else {
        document.getElementById('result-display').innerText = "Error";
        document.getElementById('category-text').innerText = "Check measurements";
    }
});