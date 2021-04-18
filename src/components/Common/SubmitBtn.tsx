import React from 'react';
import './style/SubmitBtn.scss';

interface Iprops {
  str: string,
  submitHandler(): void,
  classname: string
}

const SubmitBtn: React.FC<Iprops> = ({str, submitHandler, classname}) => {
  return (
    <button className={classname} onClick={submitHandler}>{str}</button>
  );
};

export default SubmitBtn;