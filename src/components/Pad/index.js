import { updateTracks } from '../../actions';
import { Component } from 'preact';
import { connect } from 'preact-redux';
import styled from 'styled-components';

const StyledPad = styled.div.attrs({
	style: props => ({
	  background: props.bg
	})
})`
	transition: box-shadow 0.3s;
	z-index: 98;
	opacity: ${props => props.opacity};
	transition: opacity 0.4s;
`;

const StyledPadSoundName = styled.div.attrs({
	style: props => ({
	  background: props.active ? `#fff` : `#1eb980`
	})
})`
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

	shouldComponentUpdate(nextProps) {
		let activeChanged = nextProps.active !== this.props.active;
		let CurrentStepChanged = this.props.currentStep !== nextProps.currentStep;
		return activeChanged;
	}

	render({ active, currentStep, number, soundName }) {
		if (number === 0) {
			return (
				<StyledPadSoundName
					active={active}
					bg="#fff"
					onClick={this.updateTrackHelper}
				>
					<StyledText>{soundName}</StyledText>
				</StyledPadSoundName>
			);
		}
		if (currentStep === number && active) {
			return (
				<StyledPad
					bg="#fff"
					onClick={this.updateTrackHelper}
				/>
			);
		}
		else if (active) {
			return <StyledPad bg="#eaeaeb" onClick={this.updateTrackHelper} />;
		}
		else if (currentStep === number) {
			return <StyledPad bg="#000" onClick={this.updateTrackHelper}/>;
		}
		else if (number % 8 === 0) {
			return <StyledPad bg="#005d57" onClick={this.updateTrackHelper} />;
		}
		return <StyledPad bg="#1eb980" onClick={this.updateTrackHelper} />;
	}
}

export default connect(
	null,
	{ updateTracks }
)(Pad);
