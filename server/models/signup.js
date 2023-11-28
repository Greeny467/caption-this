
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from './graphql/mutations'; // Your GraphQL mutation

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signup }) => {
      // Handle successful signup (e.g., redirect to login page)
      console.log(signup);
    },
  });

  const handleSignup = () => {
    signup({ variables: { username, email, password } });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleSignup} disabled={loading}>
          Signup
        </button>

        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default Signup;
