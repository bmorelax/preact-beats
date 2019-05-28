import styled from 'styled-components';

const StyledTypePad = styled.div.attrs({
	style: props => ({
		background: getColor(props.type),
		opacity: props.active ? '1' : '0.15'
	})
})`
	transition: box-shadow 0.1s;
	z-index: 97;
	border-radius: 20%;
	height: 4vh;
	width: 1vw;
	box-shadow: ${props => props.active ? '0 3px 23px' : ''} ${props => getColor(props.type)};
`;

const getColor = type => {
	let color;
	switch (type) {
		case 'snare':
			color = '#FF6859';
			break;
		case 'kick':
			color = '#B15DFF';
			break;
		case 'synth':
			color = '#FFCF44';
			break;
		case 'hihat':
			color = '#72DEFF';
			break;
		default:
			color = '#FFFFFF';
	}
	return color;
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const RenderStyledTypePad = ({ type, active, updateTrackHelper }) => (
	<Container>
		<StyledTypePad type={type} active={active} onClick={updateTrackHelper} />
	</Container>
);

export default RenderStyledTypePad;
