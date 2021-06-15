import styled, { css, keyframes } from 'styled-components';
import {device} from '../../../style/variable';

const shakeAnimation = keyframes` 
  0%, 100% { transform: translate3D(0, -50%, 0); }
  10%, 30%, 50%, 70%, 90% { transform: translate3D(-10px, -50%, 0); }
  20%, 40%, 60%, 80% { transform: translate3D(10px, -50%, 0); }
`;

const showFromLeftAnimation = keyframes`
  0% {
    transform: translate3D(500px, -50%, 0);
  }
  100% {
      transform: translate3D(0, -50%, 0);
  }
`;

export const Dimmer = styled.div<{visible: boolean, backColor: boolean}>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: ${(props) => (props.backColor ? 'rgba(190, 190, 190, 0.5)' : 'rgba(0, 0, 0, 0)')};
`;

export const OpaqueDimmer = styled.div<{visible: boolean}>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: #D4F4FA;
`;

export const OuterContainer = styled.div<{visible: boolean}>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

export const InnerContainer = styled.div<{isWarning: boolean, isSide: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  top: 50%;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: ${props => props.color};
  margin: 0 auto;
  transform: translateY(-50%);
  outline:none;
  ${(props) => props.isSide && css`
    animation: ${showFromLeftAnimation} 0.8s;
  `}
  ;

  ${(props) => props.isSide && css ? `
  width: 30%;
  height: 100%;
  right: 0; 
  position: fixed; 
  top: 50%;
  @media ${device.desktopS} {
    min-width: 50%;}
  @media ${device.mobile} {
    width: 100%;}
  ` : `
  max-width: 600px;
  min-width: 50px;
  min-height: 100px;
  top: 50%;
  border-radius: 0.313rem;
  `}

  ${(props) => props.isWarning && css`
    animation: ${shakeAnimation} 0.3s alternate;
  `}
`;

export const InnerMenuContainer = styled.div<{color: string}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: ${props => props.color};
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  outline:none;
  animation: ${showFromLeftAnimation} 0.4s;
  width: 30%;
  height: 100vh;
  right: 0; 
  position: fixed; 
  `;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: #F361A6;
  border-radius: 50%;
  width: 13.5vw;
  height: 13.5vw;
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  position: absolute;
  top: 10px;
  right: 10px;
`;