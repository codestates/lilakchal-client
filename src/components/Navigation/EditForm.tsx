import React, { useState } from 'react';
import { Wrapper, Title, Container, InputName, ErrorMessage } from './EditFormStyle';
import SubmitBtn from '../../modules/SubmitBtn';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import axios from 'axios';

import { UserInfoHandler } from '../../redux/modules/UserInfo';

interface IEditFrom {
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const EditForm: React.FC<IEditFrom> = ({ setIsOpenPopup }) => {

  const dispatch = useDispatch();
  const userinfoState = useSelector((state: RootState) => state.UserInfoReducer);
  const { id, kakaoId, name } = userinfoState;

  const [errorMessage, setErrorMessage] = useState<string>('');

  const submitHandler = async () => {

    const regexr = /[\s]|[~!@#$%^&*()_+|<>?:{}]/;
    console.log('EditFrom line 25', regexr.test(name));

    if (name.length === 0 || name.length > 12) {
      console.log('EditFrom line 28', name);
      setErrorMessage('닉네임은 1글자 이상, 12글자 이하여야 합니다.');
      return;
    } else if (regexr.test(name)) {
      setErrorMessage('공백, 특수문자는 사용할 수 없습니다.');
      return;
    } else {
      await axios.patch('https://localhost:4000/user/name', 
        {userId: id, name}, 
        {withCredentials: true});
      console.log('EditForm line 38', name);
      setTimeout(() => console.log('EditForm line 39', name), 3000);
      setErrorMessage('');
      setIsOpenPopup(false);
    }
  };

  const getUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(UserInfoHandler({ id, kakaoId, name: e.target.value }));
  };

  const str = '변경';

  return (
    <Wrapper>
      <Title>이름 변경</Title>
      <ErrorMessage>{errorMessage ? `${errorMessage}` : <></>}</ErrorMessage>
      <Container>
        <InputName placeholder="변경할 이름을 입력해주세요." onChange={getUserName}/>
        <SubmitBtn str={str} submitHandler={submitHandler} />
      </Container>
    </Wrapper>
  );
};

export default EditForm;