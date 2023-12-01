import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";
import uploadFile from "../../utils/uploadFile";

export default function CreatePost() {
  const [createPost, { error }] = useMutation(ADD_POST);
  const [file, setFile] = useState(null);
  const [timer, setTimer] = useState(0);
  const [tabState, setTabState] = useState("closed");

  const { loading, data } = useQuery(GET_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data ? data.me : null;

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleTimeSet = (e) => {
    setTimer(Number(e.target.value));
  };

  const handleSubmit = async () => {
    if (!user) {
      console.error("Error finding user");
      return;
    }

    const key = await uploadFile(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("timer", timer);

    try {
      const response = await createPost({
        variables: {
          user: user._id,
          imageURL: key,
        },
      });

      setFile(null);
      setTimer(0);

      console.log("New post:", response.data.createPost);
    } catch (error) {
      console.error("Error submitting post", error);
    }
  };

  const handleChangeTabState = () => {
    if (tabState === "closed") {
      setTabState("open");
    } else {
      setTabState("closed");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleUpload({ target: { files: e.dataTransfer.files } });
  }

  return (
    <>
      <button onClick={handleChangeTabState} name="openTab" className="tabToggle">
        Create a Post
      </button>
      {tabState === "open" && (
        <form className="image-upload-container">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
          <label
            htmlFor="image-upload"
            className="upload-area"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {file ? (
              <img src={file} alt="Uploaded" />
            ) : (
              "Click here or drag an image to upload"
            )}
          </label>
          <label htmlFor="timerForm" id="timeFormLabel">Set Time</label>
          <input
          id="timerForm"
            type="number"
            name="timer"
            value={timer}
            onChange={handleTimeSet}
            placeholder="Time Here"
          />
          <button onClick={handleSubmit}>Submit</button>
        </form>
      )}
    </>
  );
}
