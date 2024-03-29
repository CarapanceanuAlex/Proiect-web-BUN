
function displaySuccess(message) {
    // functie care afiseaza un mesaj de success pe ecran cand toate validarile sunt ok
    const successContainer = document.getElementById('successContainer');
    successContainer.innerHTML = `<p class="success">${message}</p>`;
}

function clearSuccess() {
    // functie care sterge mesajul de success
    const successContainer = document.getElementById('successContainer');
    successContainer.innerHTML = '';
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

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired');
    const formSignUp = document.getElementById('formSignUp');

    formSignUp.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Form submit prevented'); // Add this line
        submit();
    });
});

//`````````````````````````````````````````````````````````````````````````````````
function submit() {
    // get data from inputs 
    const inputs = document.getElementsByTagName("input");
    const email = inputs[0].value;
    const password = inputs[1].value; 
    const retypePassword = inputs[2].value;

    if (!email || !password || !retypePassword) {
        clearSuccess()
        displayError('All fields must be filled');
        return;
    }

    if (password.length < 6) {
        clearSuccess()
        displayError('Password must be at least 6 characters long');
        return;
    }

    if (password.length > 20) {
        clearSuccess()
        displayError('Password must be less than 20 characters long');
        return;
    }

    if (password === 'password') {
        clearSuccess()
        displayError('Serios? Pune ba o parola adevarata');
        return;
    }

    if (password !== retypePassword) {
        clearSuccess()
        displayError('Your retyped password doesn\'t match');
        return;
    }

    if (password.length <= 6) {
        clearSuccess()
        displayError('The password must be atleast 6 char. long');
        return;
    }

    if (email || password == retypePassword) {
        clearError();
        displaySuccess('Successfully signed up');
        return;
    }

    console.log('TRB SA SCRIE ASTA IN CONSOLA');

    const data = {
        "email": email,
        "password": password,
        "retype_password": retypePassword
    } 
    const jsonData = JSON.stringify(data);

    // build a request object
    const request = new XMLHttpRequest();

    // open a connection to my api 
    request.open("POST", "http://localhost:5501/api/v1/register");

    // customise the request 
    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");
    
    // specify what happens when data arrives 
    request.onload = processRequestToSendDataResponse;
    
    // specify what happens when an error occurs
    request.onerror = processErrorResponse; 

    // send the data 
    request.send(jsonData);

    console.log('SI ASTA MAI TREBUIE SA scrie');

    function processRequestToSendDataResponse() {
        const response = JSON.parse(request.response);

        if (request.status == 200) {
            localStorage.setItem("user-id", response.data.user_id);
            // sessionStorage.setItem("user-id", response.data.user_id);
            window.location.replace("main.html");
        }
    }

    function processErrorResponse() {
        const response = JSON.parse(request.response);
        
        if (request.status == 400 || request.status == 500) {
            const errorMessage = document.getElementById("errorContainer");
            if (errorMessage) {
                errorMessage.innerText = response.message;
            } else {
                const p = document.createElement("p");
                p.id = "error-message"
                p.innerText = response.message;
                p.className = "error-message";
                const body = document.getElementsByTagName("body")[0];
                body.appendChild(h1);
            }
        }
    }
}


