import styled from 'styled-components';
import StartStopButton from '../StartStopButton';
import TempoButtons from '../TempoButtons';

const StyledMenu = styled.div`
	background: #373740;
	height: 5vh;
	display: flex;
	flex-direction: row;
`;

const CurrentTempo = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	height: 5vh;
	width: 25vw;
	color: #37d6a9;
	font-size: 1.1rem;
`;

const Menu = ({ playPause, isPlaying, currentTempo }) => (
	<StyledMenu>
		<StartStopButton playPause={playPause} isPlaying={isPlaying} />
		<CurrentTempo>Tempo: {currentTempo}</CurrentTempo>
		<TempoButtons />
	</StyledMenu>
);

export default Menu;
