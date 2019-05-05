import { Component } from 'preact';
import Bumpkit from 'bumpkit';
import PadGrid from '../PadGrid';
import Q from 'q';
import qs from 'query-string';
import style from './style';

class Sequencer extends Component {
	changeColor = () => {
		this.state.color === 'red' ? this.setState({ color: 'green' }) : this.setState({ color: 'red' });
	}

	handleTempoChange = (e) => {
		let tempo = e.target.value;
		this.setTempo(tempo);
	}
	
	setTempo = (n) => {
		this.bumpkit.tempo = n;
		this.setState({ tempo: this.bumpkit.tempo }, () => {
		  // Fix this in Bumpkit
		  if (this.state.isPlaying) {
				this.state.mixer.master.mute.gain.value = 0;
				this.playPause();
				this.playPause();
				this.state.mixer.master.mute.gain.value = 1;
		  }
		  this.updateUrlParams();
		});
	}
	

	loadKit = (i) => {
		this.setState({ currentKit: i }, function() {
		  this.loadBuffers().then(function() {
				this.loadSamplers();
		  });
		  this.updateUrlParams();
		});
	}

	// Play / Pause Bumpkit
	playPause = () => {
		if (!this.bumpkit) return false;
		this.bumpkit.playPause();
		this.setState({
		  isPlaying: this.bumpkit.isPlaying
		});
	}

	loadSamplers = () => {
		let samplers = this.state.samplers;
		let bufferKeys = Object.keys(this.state.buffers);
		bufferKeys.forEach((key, i) => {
		  samplers[i].buffer(this.state.buffers[key]);
		});
		this.setState({ samplers }, () => {
		  console.log('samplers loaded');
		});
	}

	addStepListener = () => {
		if (!window) return false;
		console.log(window);
		window.addEventListener('step', (e) => {
		  let step = e.detail.step;
		  this.setState({ currentStep: step });
		});
	}

	updateUrlParams = () => {
		if (!window) { return false; }
		let params = {
		  tempo: this.state.tempo,
		  currentKit: this.state.currentKit,
		  currentBank: this.state.currentBank
		};
		let query = '?' + qs.stringify(params);
		window.history.pushState(params, 'Stepkit', query);
	}

	// Load the sounds into the buffer
	loadBuffers = () => {
		let deferred = Q.defer();
		let kit = this.state.kits[this.state.currentKit];
		let samples = kit.samples;
		let buffers = this.state.buffers;
		this.bumpkit.buffers = {};
		samples.forEach((sample, i) => {
		  ((index) => {
				let url = this.state.audio_path + kit.path + '/' + sample;
				this.bumpkit.loadBuffer(url, (buffer) => {
			  buffers[index] = buffer;
			  buffers[index].url = url;
			  if ( samples.length <= Object.keys(this.bumpkit.buffers).length ) {
						this.setState({ buffers }, () => {
				  deferred.resolve();
						});
			  }
				});
		  })(i);
		});
		return deferred.promise;
	  }

	updateClips = (clips) => {
		this.setState({ clips });
	}

	// Load the soundbank
	loadBank = () => {
		let clips = this.state.clips;
		this.state.tracks.forEach((track, j) => {
		  clips[j].pattern = track.pattern;
		});
		this.updateClips(clips);
		let tempo = false;
		if (tempo) {
		  this.setTempo(tempo);
		}
		this.updateUrlParams();
	}

	// ??
	initConnections = () => {
		for (let i = 0; i < 8; i++) {
		  let clip = this.state.clips[i];
		  let sampler = this.state.samplers[i];
		  let track = this.state.mixer.tracks[i];
		  clip.connect(sampler);
		  sampler.connect(track);
		}
	}

	// ??
	initSamplers = () => {
		let samplers = [];
		for (let i = 0; i < 8; i++) {
		  let sampler = this.bumpkit.createSampler();
		  samplers[i] = sampler;
		}
		return samplers;
	}

	// ??
	initClips = () => {
		let clips = [];
		for (let i = 0; i < 8; i++) {
		  clips[i] = this.bumpkit.createClip();
		  clips[i].pattern = [];
		}
		return clips;
	}
	
	// ??
	initMixer = () => {
		let mixer = this.bumpkit.createMixer();
		// Add 8 tracks to the Mixer
		for (let i = 0; i < 8; i++) {
			mixer.addTrack();
		}
		return mixer;
	}

	// ??
	initBumpkit = () => {
		// Initialize new Bumpkit instance
		this.bumpkit = new Bumpkit();
		// Add loopLength
		this.bumpkit.loopLength = this.state.loopLength;
		// Create new Bumkit-Mixer
		let mixer = this.initMixer();
		let clips = this.initClips();
		let samplers = this.initSamplers();
		// Update state and load sounds etc. after its done
		this.setState({
			mixer,
			clips,
			samplers,
			isPlaying: this.bumpkit.isPlaying
		}, () => {
			this.initConnections();
			this.loadBank();
			this.loadBuffers().then(() => {
			  this.loadSamplers();
			});
		});
		this.addStepListener();
	}

	constructor() {
		super();
		this.state = {
			color: 'red',
			isPlaying: false,
			loopLength: 16,
			tempo: 96,
			currentStep: 0,
			volume: 1,
			buffers: [],
			mixer: null,
			clips: [],
			samplers: [],
			currentBank: 0,
			currentKit: 0,
			tracks: [
				{ pattern: [1,0,1,0, 0,0,0,0, 0,0,0,0, 0,0,1,0 ] },
				{ pattern: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0 ] },
				{ pattern: [1,0,1,0, 1,0,0,0, 0,0,0,0, 0,0,0,0 ] },
				{ pattern: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0 ] },
				{ pattern: [1,0,0,0, 0,0,1,0, 0,0,0,1, 0,0,0,0 ] },
				{ pattern: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0 ] },
				{ pattern: [0,0,0,0, 0,1,0,0, 1,0,0,1, 0,0,1,1 ] },
				{ pattern: [1,1,1,1, 0,0,0,0, 0,0,0,0, 1,0,0,0 ] }
			],
			audio_path: '//jxnblk.s3.amazonaws.com/stepkit',
			kits: [
			  {
					name: 'Bedford',
					path: '/bedford',
					samples: [
						'kick.mp3',
						'snare.mp3',
						'rim.mp3',
						'hat.mp3',
						'bell.mp3',
						'stab01.mp3',
						'stab02.mp3',
						'stab03.mp3'
					]
			  }
			]
		};
		this.playPause = this.playPause.bind(this);
		this.changeColor = this.changeColor.bind(this);
		this.handleTempoChange = this.handleTempoChange.bind(this);
		this.initBumpkit = this.initBumpkit.bind(this);
	}

	componentDidMount() {
		// Initialize Bumkit
		// Doesnt work because AudioContext only works after user interaction
		//this.initBumpkit();
	}

	render() {
		return (
			<div>
				<button onClick={this.initBumpkit} class={style.button} />
				<div>Current Beat: {this.state.beatDur}</div>
				<div onClick={this.changeColor}>{this.state.color}</div>
				<button onClick={this.playPause}>PlayPause</button>
				<label className="h5 bold mr1 hide">Tempo</label>
				<input type="text"
					value={this.state.tempo}
					onChange={this.handleTempoChange}
				/>
				<div>CurrentStep: {this.state.currentStep}</div>
				<PadGrid tracks={this.state.tracks} />
			</div>
		);
	}
}

export default Sequencer;
