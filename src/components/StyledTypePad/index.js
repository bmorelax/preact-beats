import styled from 'styled-components';

const StyledTypePad = styled.div.attrs({
	style: props => ({
		background: getColor(props.type),
		opacity: props.active ? '1' : '0.4'
	})
})`
	transition: box-shadow 0.3s;
	z-index: 97;
	opacity: ${props => props.opacity};
	transition: opacity 0.4s;
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
			color = '#1EB980';
	}
	return color;
};

const RenderStyledTypePad = ({ type, active, updateTrackHelper }) => (
	<StyledTypePad type={type} active={active} onClick={updateTrackHelper} />
);

export default RenderStyledTypePad;
