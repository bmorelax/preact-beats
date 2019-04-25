/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
import { Component } from 'preact';
import Pad from '../Pad';
import style from './style';
import Sound from 'react-sound';

const sounds = [
	{ id: 'kick', src: 'https://www.myinstants.com/media/sounds/snare.mp3' }
];

class DrumMaschine extends Component {
	state = {
		playing: Sound.status.PAUSED
	}

	handleClick = () => {
		console.log(this.audio);
		this.audio.src = '../../assets/sounds/kick.wav';
		this.audio.play();
		this.audio.currentTime = 0;
	}

	handleSound = () => {
		this.setState({
			playing: Sound.status.PLAYING
		});
	}
	
	render() {
		return (
			<div>
				<div class={style.button} onClick={this.handleClick}>
					Kick
					<audio id={sounds.id}
						src={sounds.src}
						className="clip"
						ref={ref => this.audio = ref}
					/>
				</div>
				<div class={style.button} onClick={this.handleSound}>
					<Sound
						url="../../assets/sounds/kick.wav"
						playStatus={this.state.playing}
						playFromPosition={300 /* in milliseconds */}
						onLoading={this.handleSongLoading}
						onPlaying={this.handleSongPlaying}
						onFinishedPlaying={this.handleSongFinishedPlaying}
					/>
				</div>
				<div class={style.button} onClick={() => console.log('onClick')}>
					HiHat
				</div>
				<div class={style.button} onClick={() => console.log('onClick')}>
					Kick2
				</div>
			</div>
		);
	}
}

export default DrumMaschine;