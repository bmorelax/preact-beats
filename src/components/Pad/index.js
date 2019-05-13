import style from './style';
import { updateTracks } from '../../actions';
import { Component } from 'preact';
import { connect } from 'preact-redux';

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
		if (active) {
			return <div class={style.activePad} onClick={this.updateTrackHelper} />;
		}
		else if (currentStep === number) {
			return <div class={style.activePadCurrent} onClick={this.updateTrackHelper} />;
		}
		return <div class={style.notActivePad} onClick={this.updateTrackHelper} />;
	}
}

export default connect(
	null,
	{ updateTracks }
)(Pad);
