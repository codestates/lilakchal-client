import React, { useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import SubmitBtn from '../Common/SubmitBtn';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import constantString from '../../modules/strings';

dotenv.config();

import { UserInfoHandler } from '../../redux/modules/UserInfo';

interface IEditFrom {
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const EditForm: React.FC<IEditFrom> = ({ setIsOpenPopup }) => {

  const dispatch = useDispatch();
  const userinfoState = useSelector((state: RootState) => state.UserInfoReducer);
  const { id } = userinfoState;

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [newName, setNewName] = useState<string>('');

  const handleSubmit = async () => {

    const regexr = /[\s]|[~!@#$%^&*()_+|<>?:{}]/;

    if (newName.length === 0 || newName.length > 12) {
      setErrorMessage(constantString.nameInputError1);
      return;
    } else if (regexr.test(newName)) {
      setErrorMessage(constantString.nameInputError2);
      return;
    } else {
      await axios.patch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/name`, 
        {userId: id, name: newName}, 
        {withCredentials: true})
        .then(() => dispatch(UserInfoHandler({id, name: newName})));
      setErrorMessage('');
      setIsOpenPopup(false);
    }
  };

  const getUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  return (
    <section className='editform-wrapper'>
      <div className='editform-title'>{constantString.nameUpdateTitle}</div>
      <span className="editform-error">{errorMessage ? `${errorMessage}` : <></>}</span>
      <div className='editform-container'>
        <input type='text' className='editform-input-name' placeholder={constantString.namePlaceholder} onChange={getUserName}/>
        <SubmitBtn classname="editform-submit" str={constantString.btnChange} submitHandler={handleSubmit} />
      </div>
    </section>
  );
};

export default EditForm;