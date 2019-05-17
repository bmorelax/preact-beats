import { updateTracks } from '../../actions';
import { Component } from 'preact';
import { connect } from 'preact-redux';
import styled from 'styled-components';

const StyledPad = styled.div`
	background: ${props => props.color};
	box-shadow: ${props => props.shadow};
	transition: box-shadow 0.3s;
	z-index: 98;
	opacity: ${props => props.opacity};
	transition: opacity 0.4s;
`;

const StyledPadSoundName = styled.div`
	background: ${props => props.active ? `#fff` : `#1eb980`};
	box-shadow: ${props => props.shadow ? '0 0 6px 3px #ffffff5b, 0 0 10px 6px #ffffff5b' : ''};
	transition: box-shadow 0.3s;
	z-index: 99;
	white-space: nowrap;
	display: flex;
	align-items: center;
`;

const StyledText = styled.p`
	color: #000;
	font-weight: bold;
	pointer-events: none;
`;

class Pad extends Component {
	updateTrackHelper = () => {
		let { number, trackNumber, active, tracks } = this.props;
		let updatedActive = !active;
		tracks[trackNumber].pattern.splice(number, 1, updatedActive);
		this.props.updateTracks({ trackNumber, number, updatedActive });
	};

	constructor() {
		super();
		this.updateTrackHelper = this.updateTrackHelper.bind(this);
	}

	render({ active, currentStep, number, soundName }) {
		if (number === 0) {
			return (
				<StyledPadSoundName
					active={active}
					color="#fff"
					shadow={currentStep === number && active}
					onClick={this.updateTrackHelper}
				>
					<StyledText>{soundName}</StyledText>
				</StyledPadSoundName>
			);
		}
		if (currentStep === number && active) {
			return (
				<StyledPad
					color="#fff"
					shadow="0 0 6px 3px #ffffff5b, 0 0 10px 6px #ffffff5b"
					onClick={this.updateTrackHelper}
				/>
			);
		}
		else if (active) {
			return <StyledPad color="#eaeaeb" onClick={this.updateTrackHelper} />;
		}
		else if (currentStep === number) {
			return <StyledPad color="#000" onClick={this.updateTrackHelper} opacity={0.2} />;
		}
		else if (number % 8 === 0) {
			return <StyledPad color="#005d57" onClick={this.updateTrackHelper} />;
		}
		return <StyledPad color="#1eb980" onClick={this.updateTrackHelper} />;
	}
}

export default connect(
	null,
	{ updateTracks }
)(Pad);
