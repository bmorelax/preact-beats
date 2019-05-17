import { Component } from 'preact';
import styled from 'styled-components';
import Pad from '../Pad';

const GridContainer = styled.div`
	display: grid;
	grid-column-gap: 1px;
	grid-row-gap: 1px;
	grid-template-columns: repeat(32, 1fr);
	grid-template-rows: repeat(19, 1fr);
	height: 90vh;
	justify-items: stretch;
	width: 100vw;
`;

class PadGrid extends Component {
	render() {
		return (
			<GridContainer>
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
			</GridContainer>
		);
	}
}

export default PadGrid;
