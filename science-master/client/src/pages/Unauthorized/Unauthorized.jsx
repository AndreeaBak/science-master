import React from 'react';
import { Link } from 'react-router-dom';
import './unauthorized.scss'

const Unauthorized = () => {

  return (
    <div className='unauthorized'>
      <h1>Unauthorized Access</h1>
      <p>Please log in to access this page.</p>
      <Link to="/login" >Login</Link>
    </div>
  );
};

export default Unauthorized;
