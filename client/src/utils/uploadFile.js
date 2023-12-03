const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  console.log(formData);
  console.log(file);

  try {
    const response = await fetch("https://api.imgur.com/3/image/", {
      method: "post",
      headers: {
        Authorization: "Client-ID d21b50296cd5db7"
      },
      body: formData
    });

    const data = await response.json();

    return data.data.link;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Rethrow the error for the calling function to handle
  }
};

export default uploadFile;