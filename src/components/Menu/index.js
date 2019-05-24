import styled, { keyframes } from 'styled-components';
import StartStopButton from '../StartStopButton';


const StyledMenu = styled.div`
	z-index: 99;
	background: #373740;
	height: 5vh;
	display: flex;
	flex-direction: row;
`;

export const keyFrameExampleOne = keyframes`
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
	width: 1.5vw;
	background: rgba(0,0,0,0.7);
	z-index: 98;
	pointer-events: none;
	animation: ${keyFrameExampleOne};
	animation-duration: 7.5s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	overflow: hidden;
	top: 5vh;
`;


const Menu = ({ playPause, isPlaying }) => (
	<StyledMenu>
		{ isPlaying ? <Overlay /> : null}
		<StartStopButton playPause={playPause} isPlaying={isPlaying} />
	</StyledMenu>
);

export default Menu;
