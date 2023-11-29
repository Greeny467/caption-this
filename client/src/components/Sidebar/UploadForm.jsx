import { useState } from 'react';

export default function UploadForm() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageChange({ target: { files: e.dataTransfer.files } });
  };

  return (
      <form action="" className="image-upload-container">
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label
        htmlFor="image-upload"
        className="upload-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedImage ? (
          <img src={selectedImage} alt="Uploaded" />
        ) : (
          "Click here or drag an image to upload"
        )}
      </label>
      <button type="submit">Upload</button>
      </form>
  );
};