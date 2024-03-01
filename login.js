function login() {
    // Get input values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    // var btnId = document.getElementById("login-btn").value;
    // Your authentication logic goes here (replace with your actual validation)
    if (username === "admin" && password === "admin123") {
        // Redirect to the admin page
        window.open("http://127.0.0.1:5500/admin.html", "_blank");
        // console.log(window.location.href);
    } else {
        // Show error message
        alert("Username or password mismatch. Please try again.");
    }
};