function redirectToSignIn() {
    window.location.href = 'signIn.html';
}

function displayError(message) {
    // Display error message on the screen
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = `<p class="error">${message}</p>`;
}

function clearError() {
    // Clear any previous error messages
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = '';
}

function submitForm() {
    const email = document.getElementById('email-signUp').value;
    const password = document.getElementById('password-signUp').value;
    const retypePassword = document.getElementById('repeatPassword-signUp').value;

    if (!email || !password || !retypePassword) {
        displayError('All fields must be filled');
        return;
    }

    if (password.length < 6) {
        displayError('Password must be at least 6 characters long');
        return;
    }

    if (password.length > 20) {
        displayError('Password must be less than 20 characters long');
        return;
    }

    if (password === 'password') {
        displayError('Serios? Pune ba o parola adevarata');
        return;
    }

    if (password !== retypePassword) {
        displayError('Your retyped password doesn\'t match');
        return;
    }

    if (email || password || retypePassword) {
        clearError();
        return;
    }

    if (password == retypePassword) {
        clearError();
        return;
    }

    if (password.length <= 6) {
        displayError('The password must be atleast 6 char. long');
        return;
    }

    const userData = {email: email, password: password}; //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DATELE UTILIZATORULUI

    // Make a POST request to the signup endpoint of your API
    fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // You can handle the response from the server here
        // For example, you may redirect the user or display a success message
    })
    .catch(error => console.error('Error:', error));
}