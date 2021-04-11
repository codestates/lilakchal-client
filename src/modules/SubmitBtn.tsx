import React from 'react';

interface Iprops {
  str: string,
  submitHandler(): void
}

const SubmitBtn: React.FC<Iprops> = ({str, submitHandler}) => {
  return (
    <button onClick={submitHandler}>{str}</button>
  );
};

export default SubmitBtn;