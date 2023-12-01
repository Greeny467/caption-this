// Logout.js

import React from 'react';
import { useMutation } from '@apollo/client';

const Logout = () => {
 

  const handleLogout = () => {
    console.log('logout..?')
  };

  return (
    <div>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
