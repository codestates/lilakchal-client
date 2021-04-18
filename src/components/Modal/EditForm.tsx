import React, { useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

import { Wrapper, Title, Container, InputName, ErrorMessage } from './style/EditFormStyle';
import SubmitBtn from '../Common/SubmitBtn';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';

dotenv.config();

import { UserInfoHandler } from '../../redux/modules/UserInfo';

interface IEditFrom {
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const EditForm: React.FC<IEditFrom> = ({ setIsOpenPopup }) => {

  const dispatch = useDispatch();
  const userinfoState = useSelector((state: RootState) => state.UserInfoReducer);
  const { id, name } = userinfoState;

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [newName, setNewName] = useState<string>('');

  const submitHandler = async () => {

    const regexr = /[\s]|[~!@#$%^&*()_+|<>?:{}]/;

    if (newName.length === 0 || newName.length > 12) {
      setErrorMessage('닉네임은 1글자 이상, 12글자 이하여야 합니다.');
      return;
    } else if (regexr.test(newName)) {
      setErrorMessage('공백, 특수문자는 사용할 수 없습니다.');
      return;
    } else {
      await axios.patch(`${process.env.REACT_APP_SERVER_ADDRESS}/user/name`, 
        {userId: id, name}, 
        {withCredentials: true})
        .then(() => dispatch(UserInfoHandler({id, name: newName})));
      setErrorMessage('');
      setIsOpenPopup(false);
    }
  };

  const getUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const str = '변경';
  const classname = 'editform-submit';

  return (
    <Wrapper>
      <Title>이름 변경</Title>
      <ErrorMessage>{errorMessage ? `${errorMessage}` : <></>}</ErrorMessage>
      <Container>
        <InputName placeholder="변경할 이름을 입력해주세요." onChange={getUserName}/>
        <SubmitBtn classname={classname} str={str} submitHandler={submitHandler} />
      </Container>
    </Wrapper>
  );
};

export default EditForm;