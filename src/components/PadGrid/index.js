import { Component } from 'preact';
import styled from 'styled-components';
import Pads from '../Pads';
import Overlay from '../Overlay';

const GridContainer = styled.div`
	display: grid;
	grid-column-gap: 1px;
	grid-row-gap: 1px;
	grid-template-columns: ${props => `repeat(${props.loopLength}, 1fr)`};
	grid-template-rows: ${props => `repeat(${props.tracks}, 1fr)`};
	height: 95vh;
	justify-items: stretch;
	width: 100vw;
	overflow: hidden;
`;

class PadGrid extends Component {
	render({ loopLength, tracks, isPlaying, samples }) {
		return (
			<GridContainer loopLength={loopLength} tracks={tracks}>
				{ isPlaying ? <Overlay /> : null }
				{tracks.map((track, trackNumber) =>
					track.pattern.map((pads, key) => (
						<Pads
							type={samples[trackNumber].type}
							tracks={tracks}
							number={key}
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
