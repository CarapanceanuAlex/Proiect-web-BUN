function displayError(message) {
    // Display error message on the screen
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = `<p class="error">${message}</p>`;
}


// Send the sign-in data to the server using a fetch request
function signIn() {
    const email = document.getElementById('email-signIn').value;
    const password = document.getElementById('password-signIn').value;
    event.preventDefault();

    if (!email || !password) {
        displayError('All fields must be filled');
        return;
    }
    //const userData = {email: email, password: password};

    // Send the sign-in data to the server using a fetch request
    fetch('http://127.0.0.1:5000/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        console.log('Response Status:', response.status);  // Log the HTTP status code
        return response.json();
    })
    .then(data => {
        console.log('Response Data:', data);  // Log the response body
        if (data.success) {
            window.location.href = 'main.html';  // Redirect to main.html on successful login
        } else {
            displayError('Invalid email or password'); // Display an error message
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
        displayError('Failed to fetch resource. Please try again.'); // Display a generic error message
    });
}
    
