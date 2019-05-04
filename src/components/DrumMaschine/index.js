import { Component } from 'preact';
import WAAClock from 'waaclock';
import style from './style';

class DrumMaschine extends Component {
	play = () => {
		const AudioContext = window.AudioContext || window.webkitAudioContext;
		this.audioCtx = new AudioContext();
		this.clock = new WAAClock(this.audioCtx, { toleranceEarly: 0.1 });
		this.clock.start();
		this.loadTrack('kick', this.audioCtx);
	};

	// This function activates the beat `beatInd` of `track`.
	startBeat = function(track, beatInd) {
		let event = this.clock.callbackAtTime((event) => {
		  let bufferNode = this.state.soundBank[track].createNode();
		  bufferNode.start(event.deadline);
		}, this.nextBeatTime(beatInd));
		event.repeat(this.state.barDur);
		event.tolerance({ late: 0.01 });
		this.state.beats[track][beatInd] = event;
	}

	// This helper calculates the absolute time of the upcoming `beatInd`
	nextBeatTime = (beatInd) => {
		let currentTime = this.audioCtx.currentTime;
		let currentBar = Math.floor(currentTime / this.state.barDur);
		let currentBeat = Math.round(currentTime % this.state.barDur);
		if (currentBeat < beatInd) return currentBar * this.state.barDur + beatInd * this.state.beatDur;
		return (currentBar + 1) * this.state.barDur + beatInd * this.state.beatDur;
	}

	// This helper loads sound buffers
	// Sounds: http://jxnblk.s3.amazonaws.com/stepkit/bedford/snare.mp3
	loadTrack = (track) => {
		let request = new XMLHttpRequest();
		request.open('GET', 'http://jxnblk.s3.amazonaws.com/stepkit/bedford/kick.mp3', true);
		request.responseType = 'arraybuffer';
		console.log('loadTrack');
		request.onload = () => {
			console.log('onLoad');
			  this.audioCtx.decodeAudioData(request.response, (buffer) => {
				let createNode = () => {
					let node = this.audioCtx.createBufferSource();
					node.buffer = buffer;
					node.connect(this.audioCtx.destination);
					return node;
				};
				this.state.soundBank[track] = { createNode };
		  });
		};
		request.send();
	}

	changeColor = () => {
		this.state.color === 'red' ? this.setState({ color: 'green'}) : this.setState({ color: 'red'});
	}

	constructor() {
		super();
		this.initialTempo = 91;
		this.initialSigniture = 4;
		this.state = {
			color: 'red',
			soundBank: {},
			beats: {},
			tempo: this.initialTempo, // tempo (in bpm)
			currentStep: 1,
			beatDur: 60 / this.initialTempo,
			signature: this.initialSigniture,
			barDur: this.initialSigniture * (60 / this.initialTempo)
		};
		this.play = this.play.bind(this);
		this.changeColor = this.changeColor.bind(this);
	}

	componentDidMount() {
		// if we wanted to load audio files, etc., this is where we should do it.
	}

	render() {
		console.log(this);
		return (
			<div>
				<button onClick={this.play} class={style.button} />
				<div>Current Beat: {this.state.beatDur}</div>
				<div onClick={this.changeColor}>{this.state.color}</div>
			</div>
		);
	}
}

export default DrumMaschine;
