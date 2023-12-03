const uploadFileToS3 = async (data, fileName) => {
  try {
    const response = await fetch('/createPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, fileName }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Assuming the server sends JSON data in the response
    const responseData = await response.json();
    
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export default uploadFileToS3;
