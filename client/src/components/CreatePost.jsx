import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST, SET_TIMED_CAPTION } from "../utils/mutations";

import Auth from '../utils/auth';
import uploadFile from "../utils/uploadFile";
import setTimerDate from '../utils/timerDate';

export default function CreatePost() {

  const [createPost, { error }] = useMutation(ADD_POST);
  const [setTimedCaption, {timerError}] = useMutation(SET_TIMED_CAPTION);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [displayFile, setDisplayFile] = useState(null);

  const [timer, setTimer] = useState(0);
  const [tabState, setTabState] = useState("closed");

  const [user, setUser] = useState(undefined);

  const options = [
    { value: 5, label: '5 minutes' },
    { value: 10, label: '10 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 180, label: '3 hours' },
    { value: 300, label: '5 hours' },
    { value: 1440, label: '1 day' },
    { value: 4320, label: '3 days' },
  ];

  useEffect(() => {
    if(Auth.loggedIn){
      console.log('logged in');
      const fetch = async () => {
        const profile = await Auth.getProfile();
        console.log(profile, profile.data);
        setUser(profile.data);
      };

      fetch();
    }
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("Error finding user");
      return;
    }
    const url = await uploadFile(file);


    if(!url){
      console.error('failed to upload to imgur');
      return
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("timer", timer);

    try {
      console.log('userData:', user);
      const response = await createPost({
        variables: {
          post: {
            user: user._id,
            imageURL: url,
            timerDate: setTimerDate(timer)
          }
        },
      });
      if(!response){
        console.error('failed to addPost');
      };

      try {
        const timerSet = await setTimedCaption({
          variables: {
            time: timer,
            post: response.data.addPost._id
          }
        });

        if(timerSet.success === false) {
          console.error('failed to set timer', timerSet.message);
        }
        else{
          console.log(timerSet.message);
        };

      } catch (error) {
        console.error('failed to set timer', error);
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

          <label htmlFor="timerForm" id="timeFormLabel">Set Time in Minutes</label>
          <select id="timerForm" name="timerSet" value={timer} onChange={handleTimeSet}>
            <option value="" disabled>Select a time</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button onClick={handleSubmit}>Submit</button>
        </form>
      )}
    </>
  );
}
