const baseApiEndpoint = 'https://hz2qq5rsrk.execute-api.us-east-1.amazonaws.com/prod/items';

function clearFormFields(formId) {
    const form = document.getElementById(formId);

    // Check if the form exists
    if (form) {
        // Loop through all input elements in the form
        Array.from(form.elements).forEach((element) => {
            if (element.tagName === 'INPUT') {
                // Clear the value of input fields
                element.value = '';
            }
        });
    } else {
        console.error('Form not found');
    }
}

// GET DETAILS
document.getElementById('getButton').addEventListener('click', makeApiRequest);

function makeApiRequest() {
    // Replace 'YOUR_API_ENDPOINT' with the actual endpoint URL from your AWS API Gateway
    //const baseApiEndpoint = 'https://2rbr16oemc.execute-api.us-east-1.amazonaws.com/prod/items';

    // Get the user ID from the input field
    const userId = document.getElementById('userId').value;

    // // Check if the user ID is null
    // if (!userId) {
    //     alert('This Account Does Not Exist');
    //     return;
    // }

    // Construct the complete endpoint URL with the user ID
    const apiEndpoint = `${baseApiEndpoint}?ID=${userId}`;

    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    // User not found in the database
                    throw new Error('Please enter the Account Id.');
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(data => {
            // Handle the data from the API response
            console.log(data);

            // Check if the entered ID is not equal to the ID in the database
            if (data.ID !== userId) {
                throw new Error('Entered ID does not match the ID in the database');
            }
            // Display all details in the HTML
            document.getElementById('userIdDisplay').textContent = data.ID;
            document.getElementById('userNameDisplay').textContent = data.Name;
            document.getElementById('userCreditScoreDisplay').textContent = data.CreditScore;
            document.getElementById('userCountryDisplay').textContent = data.Country;
            document.getElementById('userGenderDisplay').textContent = data.Gender;
            document.getElementById('userAgeDisplay').textContent = data.Age;
            document.getElementById('userTenureDisplay').textContent = data.Tenure;
            document.getElementById('userBalanceDisplay').textContent = data.Balance;
            document.getElementById('userHasCreditCardDisplay').textContent = data.HasCreditCard;
            document.getElementById('userAccountStatusDisplay').textContent = data.AccountStatus;

            // alert('API Response: ' + JSON.stringify(data));
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        });
}




// CREATE ACCOUNT
document.getElementById('postButton').addEventListener('click', makePostRequest);

function makePostRequest() {
    // Replace 'YOUR_API_ENDPOINT' with the actual base endpoint URL from your AWS API Gateway
    //const baseApiEndpoint = 'https://eu1rzilzrc.execute-api.us-east-1.amazonaws.com/prod/items';
    console.log("baseApiEndpoint", baseApiEndpoint);

    // Get the user details from the input fields
    const postuserId = document.getElementById('postuserId').value;
    const userName = document.getElementById('userName').value;
    const balance = document.getElementById('balance').value;
    const creditScore = document.getElementById('creditScore').value;
    const country = document.getElementById('country').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const tenure = document.getElementById('tenure').value;
    const hasCreditCard = document.getElementById('hasCreditCard').value;
    const accountStatus = document.getElementById('accountStatus').value;

    console.log("postuserId:", postuserId);
    console.log("userName", userName);

    // Construct the complete endpoint URL
    const apiEndpoint = `${baseApiEndpoint}`;

    // Define the data to be sent in the POST request
    const postData = {
        Name: userName,
        ID: postuserId,
        Balance: balance,
        CreditScore: creditScore,
        Country: country,
        Gender: gender,
        Age: age,
        Tenure: tenure,
        HasCreditCard: hasCreditCard,
        AccountStatus: accountStatus
    };
    console.log("postData", postData);

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Add any additional headers as needed
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the data from the API response if needed
            console.log(data);
            alert('User created successfully');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        });


    clearFormFields("insertAccountForm");
}


// MODIFY ACCOUNT - FETCH DETAILS
document.getElementById('populateFieldsButton').addEventListener('click', populateFields);

function populateFields() {
    // Get the user details from the input fields
    const userId = document.getElementById('putuserId').value;

    // Construct the complete endpoint URL with the user ID
    const apiEndpoint = `${baseApiEndpoint}?ID=${userId}`;

    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the data from the API response
            console.log(data);

            // Display all details in the HTML
            document.getElementById('putuserName').value = data.Name;
            document.getElementById('putcreditScore').value = data.CreditScore;
            document.getElementById('putcountry').value = data.Country;
            document.getElementById('putgender').value = data.Gender;
            document.getElementById('putage').value = data.Age;
            document.getElementById('puttenure').value = data.Tenure;
            document.getElementById('putbalance').value = data.Balance;
            document.getElementById('puthasCreditCard').value = data.HasCreditCard;
            document.getElementById('putaccountStatus').value = data.AccountStatus;

            // alert('API Response: ' + JSON.stringify(data));
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        });
    // Populate the input fields with the retrieved data


}


// MODIFY ACCOUNT - UPDATE DETAILS

document.getElementById('putButton').addEventListener('click', makePutRequest);

function makePutRequest() {
    // Replace 'YOUR_API_ENDPOINT' with the actual base endpoint URL from your AWS API Gateway
    //const baseApiEndpoint = 'https://2rbr16oemc.execute-api.us-east-1.amazonaws.com/prod/items';
    console.log("baseApiEndpoint", baseApiEndpoint);

    // Get the user details from the input fields
    const ids = document.getElementById('putuserId').value;
    const name = document.getElementById('putuserName').value;
    const balance = document.getElementById('putbalance').value;
    const creditScore = document.getElementById('putcreditScore').value;
    const country = document.getElementById('putcountry').value;
    const gender = document.getElementById('putgender').value;
    const age = document.getElementById('putage').value;
    const tenure = document.getElementById('puttenure').value;
    const hasCreditCard = document.getElementById('puthasCreditCard').value;
    const accountStatus = document.getElementById('putaccountStatus').value;

    console.log("putuserId", ids);
    console.log("putuserName", name);

    // Construct the complete endpoint URL
    const apiEndpoint = `${baseApiEndpoint}`;

    // Define the data to be sent in the PUT request
    const putData = {
        Name: name,
        ID: ids,
        Balance: balance,
        CreditScore: creditScore,
        Country: country,
        Gender: gender,
        Age: age,
        Tenure: tenure,
        HasCreditCard: hasCreditCard,
        AccountStatus: accountStatus
    };
    console.log("putData", putData);

    fetch(apiEndpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            // Add any additional headers as needed
        },
        body: JSON.stringify(putData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the data from the API response if needed
            console.log(data);
            alert('User updated successfully');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        });

    clearFormFields("modifyAccountForm");

}





// DELETE ACCOUNT
document.getElementById('deleteButton').addEventListener('click', makeDeleteRequest);

function makeDeleteRequest() {
    // Replace 'YOUR_API_ENDPOINT' with the actual endpoint URL from your AWS API Gateway
    //const baseApiEndpoint = 'https://2rbr16oemc.execute-api.us-east-1.amazonaws.com/prod/items';

    // Get the user ID from the input field
    const userId = document.getElementById('deleteuserId').value;

    // Construct the complete endpoint URL with the user ID
    const apiEndpoint = `${baseApiEndpoint}?ID=${userId}`;

    fetch(apiEndpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // Add any additional headers as needed
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the data from the API response if needed
            console.log(data);
            alert('User deleted successfully');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        });
    clearFormFields("deleteAccountForm");

}
