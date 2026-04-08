const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-i3w2SurdRxUctXHNUL37GJPlIlmuvySQfhSzop9_vXzZ0eXZqMAAgxBzoSblYwnbYQ/exec"; 

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const submitBtn = document.querySelector('.login-submit');

    // Show loading state
    submitBtn.innerText = "Checking...";
    submitBtn.disabled = true;

    fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ 
    "action": "login", // Tells the script to check credentials
    "username": username, 
    "password": password 
})
    })
    .then(res => res.json())
    .then(data => {
        if (data.result === "success") {
            alert("Login Successful! Welcome to XoolBase.");
            window.location.href = "library.html"; 
        } else {
            alert("Invalid Credentials. Please check your Student ID and Password.");
            submitBtn.innerText = "Log In";
            submitBtn.disabled = false;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong. Check your internet or Script URL.");
        submitBtn.innerText = "Log In";
        submitBtn.disabled = false;
    });
});
