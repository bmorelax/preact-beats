import styled, { keyframes } from 'styled-components';

const animation = keyframes`
0% {
  transform: translateX(0px)
}
100% {
  transform: translateX(100vw)
}
`;

const Overlay = styled.div`
  position: absolute;
  height: 95vh;
  width: 5.5vw;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.3) 50%,rgba(255,255,255,0) 100%);
  z-index: 98;
  pointer-events: none;
  animation: ${animation};
  animation-duration: 7.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  overflow: hidden;
  top: 5vh;
`;

const RenderOverlay = () => (
	<Overlay />
);

export default RenderOverlay;