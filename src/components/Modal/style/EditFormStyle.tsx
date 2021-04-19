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
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const InputName = styled.input`
  width: 100%;
  height: 1.5rem;
  border: none;
  border-bottom: 1px solid;
  outline: none;
  flex: 1 0 0;
  margin-top: 0.25rem;
  margin-right: 1.25rem;
  font-size: 1rem;
`;

export const ErrorMessage = styled.span`
  height: 1rem;
  margin: 0.25rem 0px;
  color: #f26180;
`;