import styled, {css} from 'styled-components';

export const Container = styled.div<{isMine: boolean}>`
  height: 100px;
  max-width: 80%;
  display: flex;
  justify-content: flex-end;
  ${(props) => props.isMine ? css`
    flex-direction: row-reverse;
    background-color: #F6F6F6;
  ` : `
    flex-direction: row;
    background-color: #3DB7CC;
  `}
`;

export const Text = styled.div`
  font-size: 1rem;
`;

export const Time = styled.div`
  font-size: 0.5rem;
`;