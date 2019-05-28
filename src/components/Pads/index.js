import { updateTracks } from '../../actions';
import { Component } from 'preact';
import { connect } from 'preact-redux';
import StyledTypePad from '../StyledTypePad';

class Pads extends Component {
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
		return activeChanged;
	}

	render({ active, number, type }) {
		if (active) {
			return <StyledTypePad type={type} active={active} updateTrackHelper={this.updateTrackHelper} />;
		}
		else if (number % 8 === 0) {
			return <StyledTypePad active={active} updateTrackHelper={this.updateTrackHelper}  />;
		}
		return <StyledTypePad type={type} active={active} updateTrackHelper={this.updateTrackHelper} />;
	}
}

export default connect(
	null,
	{ updateTracks }
)(Pads);
