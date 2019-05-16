import { Component } from 'preact';
import { connect } from 'preact-redux';
import {
	changeCurrentStep,
	changeTempo,
	initReduxBumpkit,
	updateLoading,
	playPause,
	readyToPlay,
	start,
	updateBuffers,
	updateClips,
	updateSamplers,
	updateTracks
} from '../../actions';
import Landing from '../LandigPage';
import Bumpkit from 'bumpkit';
import PadGrid from '../PadGrid';
import Q from 'q';
import style from './style';

class Sequencer extends Component {
	handleTempoChange = event => {
		let tempo = event.target.value;
		this.setTempo(tempo);
	};

	setTempo = tempo => {
		this.bumpkit.tempo = tempo;
		this.props.changeTempo(this.bumpkit.tempo);
	};

	// Play / Pause Bumpkit
	playPause = () => {
		if (!this.bumpkit) return false;
		this.bumpkit.playPause();
		this.props.playPause(this.bumpkit.isPlaying);
	};

	loadSamplers = () => {
		let samplers = this.props.samplers;
		let bufferKeys = Object.keys(this.props.buffers);
		bufferKeys.forEach((key, i) => {
			samplers[i].buffer(this.props.buffers[key]);
		});
		this.props.updateSamplers(samplers);
	};

	addStepListener = () => {
		window.addEventListener('step', event => {
			let step = event.detail.step;
			this.props.changeCurrentStep(step);
		});
	};

	// Load the sounds into the buffer
	loadBuffers = () => {
		this.props.updateLoading(true);
		let deferred = Q.defer();
		let kit = this.props.kits[this.props.currentKit];
		let samples = kit.samples;
		let buffers = this.props.buffers;
		this.bumpkit.buffers = {};
		samples.forEach((sample, i) => {
			(index => {
				let url = this.props.audioPath + kit.path + '/' + sample;
				this.bumpkit.loadBuffer(url, buffer => {
					buffers[index] = buffer;
					buffers[index].url = url;
					if (samples.length <= Object.keys(this.bumpkit.buffers).length) {
						this.props.updateBuffers(buffers);
						deferred.resolve();
					}
				});
			})(i);
		});
		return deferred.promise;
	};

	updateClips = () => {
		let { clips } = this.props;
		this.props.tracks.forEach((track, j) => {
			clips[j].pattern = track.pattern;
		});
		this.props.updateClips(clips);
	};

	updateClipsDuration = () => {
		let { clips, buffers } = this.props;
		this.props.clips.forEach((clip, j) => {
			clips[j].output.duration = buffers[j].duration;
		});
		this.props.updateClips(clips);
	}

	// Load the soundbank
	loadBank = () => {
		let clips = this.props.clips;
		this.props.tracks.forEach((track, j) => {
			clips[j].pattern = track.pattern;
		});
		this.updateClips(clips);
	};

	// Initialize the Connections
	initConnections = () => {
		let clips = this.props.clips;
		for (let i = 0; i < 8; i++) {
			let clip = clips[i];
			let sampler = this.props.samplers[i];
			let track = this.props.mixer.tracks[i];
			clip.connect(sampler);
			sampler.connect(track);
		}
	};

	// We create the initial samplers
	initSamplers = () => {
		let samplers = [];
		for (let i = 0; i < 8; i++) {
			let sampler = this.bumpkit.createSampler();
			samplers[i] = sampler;
		}
		return samplers;
	};

	// We create the initial Clips
	initClips = () => {
		let clips = [];
		for (let i = 0; i < 8; i++) {
			clips[i] = this.bumpkit.createClip();
			clips[i].pattern = [];
		}
		return clips;
	};

	// We create the initial Mixer
	initMixer = () => {
		let mixer = this.bumpkit.createMixer();
		// Add 8 tracks to the Mixer
		for (let i = 0; i < 8; i++) {
			mixer.addTrack();
		}
		return mixer;
	};

	// We initialize Bumpkit
	initBumpkit = () => {
		// Initialize new Bumpkit instance
		this.firstInit = true;
		this.bumpkit = new Bumpkit();
		// Add loopLength
		this.bumpkit.loopLength = this.props.loopLength;

		let mixer = this.initMixer();
		let initialClips = this.initClips();
		let samplers = this.initSamplers();
		// Change the tempo in bumpkit to our initial tempo
		this.setTempo(96);

		this.props.initReduxBumpkit(
			mixer,
			initialClips,
			samplers,
			this.bumpkit.isPlaying
		);
		this.addStepListener();
	};

	constructor() {
		super();
		this.playPause = this.playPause.bind(this);
		this.handleTempoChange = this.handleTempoChange.bind(this);
		this.initBumpkit = this.initBumpkit.bind(this);
		this.updateClips = this.updateClips.bind(this);
		this.updateClipsDuration = this.updateClipsDuration.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.currentStep !== nextProps.currentStep) {
		}

		if (nextProps.mixer !== null) {
			// this.initConnections();
		}

		if (this.props.tracks !== nextProps.tracks) {
			// We update the clip patterns when the tracks changed
			// So that tracks and clip patterns are in sync
			let clips = this.props.clips;
			nextProps.tracks.forEach((track, j) => {
				clips[j].pattern = track.pattern;
			});
			this.props.updateClips(clips);
		}
	}

	componentDidUpdate() {
		window.bumpkit = this.bumpkit;
		if (this.props.mixer !== null && this.firstInit === true) {
			this.firstInit = false;
			this.initConnections();
			this.loadBank();
			this.loadBuffers().then(() => {
				this.loadSamplers();
				this.updateClipsDuration();
				this.props.updateLoading(false);
				this.props.readyToPlay(true);
			});
		}
	}

	render() {
		return (
			<div>
				{this.props.ready ? (
					<div>
						<button onClick={this.initBumpkit} class={style.button}>
							Start
						</button>
						<div>Current Beat: {this.props.beatDur}</div>
						<button onClick={this.playPause}>PlayPause</button>
						<label className="h5 bold mr1 hide">Tempo</label>
						<input type="text" onChange={this.handleTempoChange} />
						<div>CurrentTempo: {this.props.tempo}</div>
						<div>CurrentStep: {this.props.currentStep}</div>
						<PadGrid tracks={this.props.tracks} currentStep={this.props.currentStep} />
					</div>
				) : (
					<Landing
						initBumpkit={this.initBumpkit}
						loading={this.props.isLoading}
					/>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {
		audioPath,
		buffers,
		clips,
		color,
		currentBank,
		currentKit,
		currentStep,
		tracks,
		isLoading,
		isPlaying,
		kits,
		loopLength,
		mixer,
		ready,
		samplers,
		tempo,
		volume
	} = state.sequencer;
	return {
		audioPath,
		buffers,
		clips,
		color,
		currentBank,
		currentKit,
		currentStep,
		tracks,
		isLoading,
		isPlaying,
		kits,
		loopLength,
		mixer,
		ready,
		samplers,
		tempo,
		volume
	};
}

export default connect(
	mapStateToProps,
	{
		changeCurrentStep,
		changeTempo,
		initReduxBumpkit,
		playPause,
		readyToPlay,
		start,
		updateBuffers,
		updateClips,
		updateLoading,
		updateSamplers,
		updateTracks
	}
)(Sequencer);
