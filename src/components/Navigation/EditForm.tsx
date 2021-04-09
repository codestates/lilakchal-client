import React, { useState } from 'react';
import { Wrapper, Title, Container, InputName } from './EditFormStyle';
import SubmitBtn from '../../modules/SubmitBtn';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducer';
import axios from 'axios';

const EditForm: React.FC = () => {

  const [newName, setNewName] = useState<string>('');
  const usernameState = useSelector((state: RootState) => state.UserInfoReducer);
  const { id } = usernameState;

  const submitHandler = async () => {
    await axios.patch('https://localhost:4000/user/name', {id, name: newName});
  };

  const getUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
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