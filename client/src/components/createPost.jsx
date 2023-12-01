import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import uploadFile from '../../../server/utils/uploadFile';

export default function CreatePost() {
  const [createPost, { error }] = useMutation(ADD_POST);
  const [file, setFile] = useState(null);
  const [timer, setTimer] = useState(0);
  const [tabState, setTabState] = useState('closed');

  const { loading, data } = useQuery(GET_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data ? data.me : null;

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleTimeSet = (e) => {
    setTimer(Number(e.target.value));
  };

  const handleSubmit = async () => {
    if (!user) {
      console.error('Error finding user');
      return;
    }

    const key = await uploadFile(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('timer', timer);

    try {
      const response = await createPost({
        variables: {
          user: user._id,
          imageURL: key,
          
        },
      });

      setFile(null);
      setTimer(0);

      console.log('New post:', response.data.createPost);
    } catch (error) {
      console.error('Error submitting post', error);
    }
  };

  const handleChangeTabState = () => {
    if(tabState === 'closed') {
        setTabState('open');
    }
    else{
        setTabState('closed');
    };
  };

  return (
    <div>
      <button onClick={handleChangeTabState} name="openTab">
        +
      </button>
      {tabState === 'open' && (
            <div>
                <input type="file" accept="image/*" onChange={handleUpload} value={undefined} />
                <input
                    type="number"
                    name="timer"
                    value={timer}
                    onChange={handleTimeSet}
                    placeholder="Time Here"
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
      )}
    </div>
  );
};
