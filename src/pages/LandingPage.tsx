import React from 'react';
import Start from '../components/Navigation/Start';
import Footer from '../components/Footer/Footer';


const LandingPage: React.FC = () => {
  localStorage.setItem('city', '');
  
  return (
    <div className='landing-container'>
      <Start/>
      <Footer/>
    </div>
  );
};

export default LandingPage;
