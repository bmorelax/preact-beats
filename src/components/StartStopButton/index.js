import styled from 'styled-components';

const StartButton = styled.button`
	background: #27272f;
	border: none;
	outline: none;
	height: 5vh;
	width: 25vw;
`;

const StopButton = styled.button`
	background: #27272f;
	border: none;
	outline: none;
	height: 5vh;
	width: 25vw;
`;

const StyledPath = styled.path`
	fill: #fff;
`;

const StartStopButton = ({ isPlaying, playPause }) => (
	<div>
		{isPlaying ? (
			<StopButton onClick={playPause}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<StyledPath d="M6 6h12v12H6z" />
				</svg>
			</StopButton>
		) : (
			<StartButton onClick={playPause}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 24 24"
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<StyledPath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
				</svg>
			</StartButton>
		)}
	</div>
);

export default StartStopButton;
