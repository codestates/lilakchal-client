import React from 'react';
import Start from '../components/Navigation/Start';
import LoadingModal from '../components/Modal/LoadingModal';

const LandingPage: React.FC = () => {
  localStorage.setItem('city', '');
  
  return (
    <div className='landing-container'>
      <Start/>
      <LoadingModal isLoading={true}/>
    </div>
  );
};

export default LandingPage;
