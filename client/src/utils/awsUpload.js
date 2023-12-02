const uploadFileToS3 = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": `image/*`
      },
      body: data,
      mode: 'cors',

    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error(error);
  }
};

export default uploadFileToS3;