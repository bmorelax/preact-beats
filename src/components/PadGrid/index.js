import style from './style';
import Pad from '../Pad';

const renderTracks = (tracks) => {
	return (
		<div>
			{tracks.map((track, trackNumber) => renderTrack(track.pattern, trackNumber))}
		</div>
	);
};

const renderTrack = (track, trackNumber) => {
	return (
		<div class={style.flexContainer}>
			{track.map((pads, key) => (
				<Pad number={key} active={pads} trackNumber={trackNumber} />
			))}
		</div>
	);
};

const PadGrid = ({ tracks }) => (
	<div>
		{renderTracks(tracks)}
	</div>
);

export default PadGrid;