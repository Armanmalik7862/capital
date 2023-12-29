// src/services/register/index.js  is responsible for making an HTTP request to the server to register a new user or call api


// src/services/register/index.js

// This function makes an HTTP request to register a new user
export const registerNewUser = async (formData) => {
  try {
    // Use the fetch function to make a POST request
    const apiResponse = await fetch('/api/users/register', {
      method: 'POST', // Specify the HTTP method
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(formData), // Convert the form data to JSON and include it in the request body
    });

    // Parse the JSON response from the server
    const finalData = await apiResponse.json();

    // Return the parsed data from where the function is call
    return finalData;
  } catch (e) {
    // If an error occurs during the request, log the error and rethrow it to handle it in the calling component
    console.error('Error during registration:', e);
    throw e;
  }
};

  