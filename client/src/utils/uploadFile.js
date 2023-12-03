const uploadFile = async (file, retries = 3) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("https://api.imgur.com/3/image/", {
      method: "post",
      headers: {
        Authorization: "Client-ID d21b50296cd5db7",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.link;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying after error: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      return uploadFile(file, retries - 1);
    } else {
      throw error; 
    }
  }
};

export default uploadFile;
