import styled from 'styled-components';

export const Wrapper = styled.section`
  padding: 20px;
  width: 480px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 5px;
`;

export const Container = styled.div`
  display: flex;
`;

export const InputName = styled.input`
  height: 1.5rem;
  border: none;
  border-bottom: 1px solid;
  outline: none;
  flex: 1 0 0;
  margin-right: 20px;
`;

export const ErrorMessage = styled.span``;