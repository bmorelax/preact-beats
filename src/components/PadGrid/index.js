import { Component } from 'preact';
import styled from 'styled-components';
import Pad from '../Pad';

const GridContainer = styled.div`
	display: grid;
	grid-column-gap: 1px;
	grid-row-gap: 1px;
	grid-template-columns: ${props => `repeat(${props.loopLength}, minmax(1rem, 1fr))`};
	grid-template-rows: ${props => `repeat(${props.tracks}, 1fr)`};
	height: 90vh;
	justify-items: stretch;
	width: 100vw;
`;

class PadGrid extends Component {
	render({ loopLength, tracks, samples }) {
		return (
			<GridContainer loopLength={loopLength} tracks={tracks}>
				{this.props.tracks.map((track, trackNumber) =>
					track.pattern.map((pads, key) => (
						<Pad
							tracks={tracks}
							number={key}
							soundName={samples[trackNumber]}
							active={pads}
							trackNumber={trackNumber}
							updateClips={this.updateClips}
							currentStep={this.props.currentStep}
						/>
					))
				)}
			</GridContainer>
		);
	}
}

export default PadGrid;
