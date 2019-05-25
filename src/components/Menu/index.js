import styled from 'styled-components';
import StartStopButton from '../StartStopButton';


const StyledMenu = styled.div`
	z-index: 99;
	background: #373740;
	height: 5vh;
	display: flex;
	flex-direction: row;
`;

const Menu = ({ playPause, isPlaying }) => (
	<StyledMenu>
		<StartStopButton playPause={playPause} isPlaying={isPlaying} />
	</StyledMenu>
);

export default Menu;
