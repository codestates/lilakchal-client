import React from 'react';
import constantStrings from '../../modules/strings';

const BidError: React.FC = () => {
  return (
    <div className='bid-error-message'>{constantStrings.bidError}</div>
  );
};


export default BidError;