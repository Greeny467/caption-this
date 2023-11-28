// Logout.js

import React from 'react';
import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from './graphql/mutations'; //  GraphQL mutation

const Logout = () => {
  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      // Handle successful logout (e.g., redirect to login page)
      console.log('Logged out successfully');
    },
  });

  const handleLogout = () => {
    logout();
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
