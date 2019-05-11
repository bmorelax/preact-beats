/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
import style from './style';
import { updateTracks } from '../../actions';
import { Component } from 'preact';
import { connect } from 'preact-redux';

class Pad extends Component {
	updateTrackHelper = () => {
		let { number, trackNumber, active, tracks } = this.props;
		let updatedActive = !active;
		console.log({ number, trackNumber, active, tracks });
		tracks[trackNumber].pattern.splice(number, 1, updatedActive);
		this.props.updateTracks({ trackNumber, number, updatedActive });
	};

	constructor() {
		super();
		this.updateTrackHelper = this.updateTrackHelper.bind(this);
	}

	render({ active }) {
		if (active) {
			return (
				<div class={style.activePad} onClick={this.updateTrackHelper} />
			);
		}
		return <div class={style.notActivePad} onClick={this.updateTrackHelper} />;
	}
}

export default connect(
	null,
	{ updateTracks }
)(Pad);
