const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-i3w2SurdRxUctXHNUL37GJPlIlmuvySQfhSzop9_vXzZ0eXZqMAAgxBzoSblYwnbYQ/exec"; 

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const submitBtn = document.querySelector('.login-submit');

    // 1. Simple Password Match Check
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Show loading state
    submitBtn.innerText = "Creating Account...";
    submitBtn.disabled = true;

    // 2. Send data to Google Sheets
    fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Use no-cors if you encounter redirect issues, or keep as is
       body: JSON.stringify({ 
        "action": "register", // Tells the script to save new info
        "fullName": fullName,
        "email": email,
        "username": username, 
        "password": password 
    })
    })
    .then(() => {
        // Since Google Apps Script often has CORS issues with 'POST', 
        // 'no-cors' might prevent you from reading the JSON response.
        // We'll assume success if the fetch finishes without a catch error.
        alert("Registration Request Sent! You can now try logging in.");
        window.location.href = "landing.html"; 
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong. Check your connection.");
        submitBtn.innerText = "Create Account";
        submitBtn.disabled = false;
    });
});