import React, { useState } from 'react';
import { Wrapper, Title, Container, InputName } from './EditFormStyle';
import SubmitBtn from '../../modules/SubmitBtn';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import axios from 'axios';

const EditForm: React.FC = () => {

  const [userName, setUserName] = useState<string>('');
  const useridState = useSelector((state: RootState) => state.UserInfoReducer);
  const { id, name } = useridState;

  const submitHandler = async () => {
    await axios.patch('https://localhost:4000/user/name', 
      {userId: id, name: userName}, 
      {withCredentials: true});
    console.log('EditForm line 18', name);
    setTimeout(() => console.log('EditForm line 19', name), 5000);
  };

  const getUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const str = '변경';

  return (
    <Wrapper>
      <Title>이름 변경</Title>
      <Container>
        <InputName placeholder="변경할 이름을 입력해주세요." onChange={getUserName}/>
        <SubmitBtn str={str} submitHandler={submitHandler} />
      </Container>
    </Wrapper>
  );
};

export default EditForm;