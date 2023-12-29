// src/services/login/index.js
export const logIn = async (formData) => {
  
  try {
    // Use the fetch function to make a POST request
    const apiResponse = await fetch('/api/users/login', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(formData), // Check the structure of formData
    });

    const finalData = await apiResponse.json();
    return finalData;
  } catch (e) {
    console.error('Error during login:', e);
    throw e;
  }
};
