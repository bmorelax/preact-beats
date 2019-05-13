import { Component } from 'preact';
import style from './style';
import Pad from '../Pad';

class PadGrid extends Component {
	render() {
		return (
			<div class={style.gridContainer}>
				{this.props.tracks.map((track, trackNumber) =>
					track.pattern.map((pads, key) => (
						<Pad
							tracks={this.props.tracks}
							number={key}
							active={pads}
							trackNumber={trackNumber}
							updateClips={this.updateClips}
							currentStep={this.props.currentStep}
						/>
					))
				)}
			</div>
		);
	}
}

export default PadGrid;
