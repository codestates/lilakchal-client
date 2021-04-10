import styled from 'styled-components';

interface IDimmer {
  visible: boolean,
  backColor: boolean
}

export const Dimmer = styled.div<IDimmer>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: ${(props) => (props.backColor ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.6)')};
`;

interface IOuterContainer {
  visible: boolean
}

export const OuterContainer = styled.div<IOuterContainer>`
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

interface IInnerContainer {
  color: string
}

export const InnerContainer = styled.div<IInnerContainer>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: ${props => props.color};
  border-radius: 20px;
  max-width: 600px;
  min-width: 50px;
  min-height: 100px;
  top: 50%;
  margin: 0 auto;
  transform: translate(-50%);
  outline: none;
`;

