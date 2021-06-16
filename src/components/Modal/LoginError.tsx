import React from 'react';
import constantString from '../../modules/strings';

const LoginError: React.FC = () => {
  return (
    <div className='login-error-message'>{constantString.loginError}</div>
  );
};


export default LoginError;