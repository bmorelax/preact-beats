import { Component } from 'preact';
import style from './style';
import Pad from '../Pad';

class PadGrid extends Component {
	updateClips = (trackNumber, padNumber) => {
	}
	
	constructor() {
		super();
		this.updateClips = this.updateClips.bind(this);
	}

	render() {
		return (
			<div class={style.gridContainer}>
				{
					this.props.tracks.map(
						(track, trackNumber) => track.pattern.map((pads, key) => (
							<Pad tracks={this.props.tracks} number={key} active={pads} trackNumber={trackNumber} updateClips={this.updateClips} />
						)))
				}
			</div>
		);
	}
}

export default PadGrid;