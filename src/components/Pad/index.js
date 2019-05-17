import { updateTracks } from '../../actions';
import { Component } from 'preact';
import { connect } from 'preact-redux';
import styled from 'styled-components';

const StyledPad = styled.div`
	background: ${props => props.color};
	box-shadow: ${props => props.shadow};
	transition: box-shadow 0.3s;
	transition: opacity 0.2s;
	opacity: ${props => props.opacity};
	z-index: 99;
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

	render({ active, currentStep, number }) {
		if (currentStep === number && active) {
			return <StyledPad color="#fff" shadow="0 0 6px 3px #ffffff5b, 0 0 10px 6px #ffffff5b" onClick={this.updateTrackHelper} />;
		}
		else if (active) {
			return <StyledPad color="#eaeaeb" onClick={this.updateTrackHelper} />;
		}
		else if (currentStep === number) {
			return <StyledPad color="#1eb980" onClick={this.updateTrackHelper} opacity={0.1} />;
		}
		else if (number%4 === 0) {
			return <StyledPad color="#005d57" onClick={this.updateTrackHelper} />;
		}
		return <StyledPad color="#1eb980" onClick={this.updateTrackHelper} />;
	}
}

export default connect(
	null,
	{ updateTracks }
)(Pad);
