// Login.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { TextField, ToggleButton, Button } from '@mui/material';

const Login = () => {
  const [drawerState, setDrawerState] = useState(true);
  const [formType, setFormType] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: ({ login }) => {
      setTimeout(() => {
        Auth.logout();
      }, 2 * 60 * 60 * 1000);
    },
  });

  const [signup, {SUloading, SUerror}] = useMutation(ADD_USER, {
    onCompleted: ({ signup }) => {
      setTimeout(() => {
        Auth.logout();
      }, 2 * 60 * 60 * 1000);
    }
  })

  const handleLogin = async () => {
    try {
      const {data} = await login({ variables: { email, password } });

      if(!data){
        console.error('Something went wrong logging in');
      };

      const {token, user} = data.login;
      Auth.login(token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const {data} = await signup({ variables: {username, email, password}});

    if(!data) {
      console.error('something went wrong signup');
    };

    console.log(data);

    const {token, user} = data.addUser;
    Auth.login(token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrawerOpen = () => {
    setDrawerState(!drawerState);
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
      {!Auth.loggedIn() ?
       (<ToggleButton
        value="Login"
        onClick={handleDrawerOpen} 
        selected={!drawerState}
        id="drawerToggle">
        Login
      </ToggleButton>)
       : (
       <ToggleButton
        value="Logout"
        onClick={()=>Auth.logout()} 
        selected={!drawerState}
        id="drawerToggle">
        Logout
      </ToggleButton>)}
      {drawerState ? (""
      ):(
        <>
          {formType === 'login' ? (
          <div className='toggledContainer'>
            <form>
              <TextField label="Email" variant="standard" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" variant='standard' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <Button variant='outlined' type="submit" onClick={handleLogin} disabled={loading}>
                Login
              </Button>
              {error && <p>{error.message.toUpperCase()}</p>}
            </form>
              <a className="formSwitchButton" onClick={handleFormType}>
                No Account? Click to Register
              </a>
          </div>
        ):(
          <div className='toggledContainer'>
            <form>
              <TextField label="Username" variant='standard' type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
              <TextField label="Email" variant='standard' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" variant='standard' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <Button variant='outlined' type="submit" onClick={handleSignup} disabled={SUloading}>
                Register
              </Button>
              {SUerror && <p>{SUerror.message.toUpperCase()}</p>}
            </form>
              <a className="formSwitchButton" onClick={handleFormType}>
                Have an Account? Click to Login
              </a>
          </div>
        )}
        </>
      )}
    </div>
  );
};

export default Login;
