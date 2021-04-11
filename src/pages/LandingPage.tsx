import React from 'react';
import Start from '../components/Navigation/Start';

const LandingPage: React.FC = () => {
  localStorage.setItem('city', '');
  
  return (
    <div className='landing-container'>
      <Start/>
    </div>
  );
};

export default LandingPage;
