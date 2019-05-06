import style from './style';
import Pad from '../Pad';

const PadGrid = ({ tracks, updateClips  }) => (
	<div class={style.gridContainer}>
		{
			tracks.map(
				(track, trackNumber) => track.pattern.map((pads, key) => (
					<Pad number={key} active={pads} trackNumber={trackNumber} updateClips={updateClips} />
				)))
		}
	</div>
);

export default PadGrid;