import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST, GET_PRESIGNED_URL } from "../../utils/mutations";
import Auth from '../../utils/auth';
import uploadFileToS3 from "../../utils/awsUpload";

export default function CreatePost() {
  const [createPost, { error }] = useMutation(ADD_POST);
  const [getURL, {urlError}] = useMutation(GET_PRESIGNED_URL);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [displayFile, setDisplayFile] = useState(null);

  const [timer, setTimer] = useState(0);
  const [tabState, setTabState] = useState("closed");

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const fetch = async () => {
      const userData = await Auth.getProfile();
      setUser(userData);
    };

    fetch();
  }, [Auth]);

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setDisplayFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleTimeSet = (e) => {
    setTimer(Number(e.target.value));
  };

  const uploadFile = async (key) => {
    console.log(key);
    const urlData = await getURL({
      variables: {
        key: key,
      }
    });
    
    console.log(urlData);

    if(urlData.presignedUrl === null){
      console.error(urlData.data.getPresignedUrl.error);
    }
    else{
      return(urlData.data.getPresignedUrl.presignedUrl);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("Error finding user");
      return;
    }
    const url = await uploadFile(fileName);


    if(!url){
      return
    };

    const upload = await uploadFileToS3(url, file);

    if(upload === false) {
      return;
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("timer", timer);

    try {
      const response = await createPost({
        variables: {
          user: user._id,
          imageURL: `https://caption-this-bucket.s3.us-west-1.amazonaws.com/${file.name}`,
        },
      });
      if(!response){
        console.log('failed to addPost');
      }

      setFileName('');
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
              <img src={displayFile} alt="Uploaded" />
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
