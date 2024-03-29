function displayError(message) {
    // Display error message on the screen
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = `<p class="error">${message}</p>`;
}


function signin() {
    // get data from inputs 
    const inputs = document.getElementsByTagName("input");
    const email = inputs[0].value;
    const password = inputs[1].value; 
    event.preventDefault();

    const data = {
        "email": email,
        "password": password
    } 
    const jsonData = JSON.stringify(data);

    // build a request object
    const request = new XMLHttpRequest();

    // open a connection to my api 
    request.open("POST", "http://localhost:5501/api/v1/authenticate");

    // customise the request 
    request.setRequestHeader("Access-Control-Allow-Credentials", "true");
    request.setRequestHeader("Content-Type", "application/json");
    
    // specify what happens when data arrives 
    request.onload = processRequestToSendDataResponse;
    
    // specify what happens when an error occurs
    request.onerror = processErrorResponse; 

    // send the data 
    request.send(jsonData);

    function processRequestToSendDataResponse() {
        const response = JSON.parse(request.response);

        if (request.status == 200) {
            localStorage.setItem("user-id", response.data.user_id);
            // sessionStorage.setItem("user-id", response.data.user_id);
            window.location.replace("main.html")
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
    
