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
  const [newName, setNewName] = useState<string>('');

  const submitHandler = async () => {

    const regexr = /[\s]|[~!@#$%^&*()_+|<>?:{}]/;
    console.log('EditFrom line 25', regexr.test(name));

    if (newName.length === 0 || newName.length > 12) {
      console.log('EditFrom line 28', name);
      setErrorMessage('닉네임은 1글자 이상, 12글자 이하여야 합니다.');
      return;
    } else if (regexr.test(newName)) {
      setErrorMessage('공백, 특수문자는 사용할 수 없습니다.');
      return;
    } else {
      await axios.patch('https://localhost:4000/user/name', 
        {userId: id, name}, 
        {withCredentials: true})
        .then(() => dispatch(UserInfoHandler({id, kakaoId, name: newName})));
      setErrorMessage('');
      setIsOpenPopup(false);
      // 변경을 누르고, axios 요청을 보내고 응답을 받았을 때 변경 되어야 한다
      // 리덕스의 username 상태를 응답 받은 값으로 변경
      // useSelect로 name을 읽고 있다 바뀌었으면 읽는다
      // .then dispatch
    }
  };

  const getUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
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