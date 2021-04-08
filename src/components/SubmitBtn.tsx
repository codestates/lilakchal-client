import * as React from 'react';

interface Iprops {
  str: string,
  submitHandler(): any
}

const SubmitBtn = ({str, submitHandler}: Iprops) => {
  return (
    <button onClick={submitHandler}>{str}</button>
  );
};

export default SubmitBtn;