// Login.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
  const [drawerState, setDrawerState] = useState('closed');
  const [formType, setFormType] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: ({ login }) => {
      // Handle successful login
      console.log(login);
    },
  });

  const [signup, {SUloading, SUerror}] = useMutation(ADD_USER, {
    onCompleted: ({ signup }) => {
      // Handle successful signup
      console.log(signup);
    }
  })

  const handleLogin = async () => {
    try {
      const {data} = await login({ variables: { email, password } });

      if(!data){
        console.log('Something went wrong logging in');
      };

      const {token, user} = data.login;
      Auth.login(token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    const {data} = await signup({ variables: {username, email, password}});

    if(!data) {
      console.log('something went wrong signup');
    };

    const {token, user} = data.addUser;
    Auth.login(token);
  };

  const handleDrawerOpen = () => {
    if(drawerState === 'closed') {
      setDrawerState('open');
    }
    else{
      setDrawerState('closed');
    };
  };

  const handleFormType = () => {
    if(formType === 'login') {
      setFormType('signup');
    }
    else{
      setFormType('login');
    };
  };

  return (
    <div>
      {drawerState === 'closed' ? (
        <button onClick={handleDrawerOpen} id="drawerOpener">Login/Signup</button>
      ):(
        <>
          {formType === 'login' ? (
          <>
            <div>
              <h2>LOGIN</h2>
              <button className="formSwitchButton" onClick={handleFormType}>
                <h2>Signup</h2>
              </button>
              <button id="drawerCloser" onClick={handleDrawerOpen}>Close</button>
            </div>
            <form>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <button type="button" onClick={handleLogin} disabled={loading}>
                Login
              </button>
              {error && <p>Error: {error.message}</p>}
            </form>
          </>
        ):(
          <>
            <div>
              <button className="formSwitchButton" onClick={handleFormType}>
                <h2>Login</h2>
              </button>
              <h2>SIGNUP</h2>
              <button id="drawerCloser" onClick={handleDrawerOpen}>Close</button>
            </div>
            <form>
              <label>Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>

              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <button type="button" onClick={handleSignup} disabled={SUloading}>
                Signup
              </button>
              {SUerror && <p>Error: {SUerror.message}</p>}
            </form>
          </>
        )}
        </>
      )}
    </div>
  );
};

export default Login;
