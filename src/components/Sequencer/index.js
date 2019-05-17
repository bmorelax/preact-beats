import { Component } from 'preact';
import Bumpkit from 'bumpkit';
import Landing from '../LandigPage';
import Menu from '../Menu';
import PadGrid from '../PadGrid';
import Q from 'q';
import { connect } from 'preact-redux';
import {
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
} from '../../actions';

class Sequencer extends Component {
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
		let kit = this.props.kit;
		let samples = kit.samples;
		let buffers = this.props.buffers;
		this.bumpkit.buffers = {};
		samples.forEach((sample, i) => {
			(index => {
				let url = this.props.audioPath + '/' + sample;
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
	};

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
		for (let i = 0; i < this.props.soundsAmount; i++) {
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
		for (let i = 0; i < this.props.soundsAmount; i++) {
			let sampler = this.bumpkit.createSampler();
			samplers[i] = sampler;
		}
		return samplers;
	};

	// We create the initial Clips
	initClips = () => {
		let clips = [];
		for (let i = 0; i < this.props.soundsAmount; i++) {
			clips[i] = this.bumpkit.createClip();
			clips[i].pattern = [];
		}
		return clips;
	};

	// We create the initial Mixer
	initMixer = () => {
		let mixer = this.bumpkit.createMixer();
		// Add 8 tracks to the Mixer
		for (let i = 0; i < this.props.soundsAmount; i++) {
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
		this.props.changeTempo(128);

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
		this.initBumpkit = this.initBumpkit.bind(this);
		this.updateClips = this.updateClips.bind(this);
		this.updateClipsDuration = this.updateClipsDuration.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.currentStep !== nextProps.currentStep) {
		}

		if (this.props.tempo !== nextProps.tempo) {
			this.bumpkit.tempo = nextProps.tempo;
		}

		if (this.props.tracks !== nextProps.tracks) {
			// We update the clip patterns when the tracks changed
			// so that tracks and clip patterns are in sync
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
						<Menu
							playPause={this.playPause}
							currentTempo={this.props.tempo}
							isPlaying={this.props.isPlaying}
						/>
						<PadGrid
							tracks={this.props.tracks}
							samples={this.props.kit.samples}
							currentStep={this.props.currentStep}
							loopLength={this.props.loopLength}
						/>
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
		currentStep,
		isLoading,
		isPlaying,
		kit,
		loopLength,
		mixer,
		ready,
		samplers,
		soundsAmount,
		tempo,
		tracks,
		volume
	} = state.sequencer;
	return {
		audioPath,
		buffers,
		clips,
		color,
		currentBank,
		currentStep,
		isLoading,
		isPlaying,
		kit,
		loopLength,
		mixer,
		ready,
		samplers,
		soundsAmount,
		tempo,
		tracks,
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
