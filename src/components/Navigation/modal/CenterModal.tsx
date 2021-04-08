import React from 'react';

interface ICenterModal {
  visible: boolean,
  onClose: boolean,
  children: void
}

const CenterModal: React.FC<ICenterModal> = ({ visible, onClose, children }) => {
  return (
    <>
      <div visible={visible}>
        {children}
        <button onClick={() => onClose}>Close</button>
      </div>
    </>
  );
};

export default CenterModal;