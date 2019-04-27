import { Component } from 'preact';
import style from './style';

class DrumMaschine extends Component {
	metronom() {
		let schedulerInterval = 100;
		this.Interval = setInterval(() => {
			console.log('interval');
			this.scheduler();
		}, schedulerInterval);
	}

	scheduleNote( beatNumber, time ) {
		console.log(this.notesInQueue);
		// push the note on the queue, even if we're not playing.
		this.notesInQueue.push( { note: beatNumber, time } );
	
		if ( (this.state.noteResolution==1) && (beatNumber%2))
			return; // we're not playing non-8th 16th notes
		if ( (this.state.noteResolution==2) && (beatNumber%4))
			return; // we're not playing non-quarter 8th notes
	
		// create an oscillator
		let osc = this.audioContext.createOscillator();
		osc.connect( this.audioContext.destination );
		if (beatNumber % 16 === 0)    // beat 0 == high pitch
			osc.frequency.value = 880.0;
		else if (beatNumber % 4 === 0 )    // quarter notes = medium pitch
			osc.frequency.value = 440.0;
		else                        // other 16th notes = low pitch
			osc.frequency.value = 220.0;
	
		osc.start( time );
		osc.stop( time + this.state.noteLength );
	}

	scheduler() {
		// while there are notes that will need to play before the next interval,
		// schedule them and advance the pointer.
		while (this.state.nextNoteTime < this.audioContext.currentTime + this.state.scheduleAheadTime) {
			this.scheduleNote( this.state.current16thNote, this.state.nextNoteTime );
			this.nextNote();
		}
	}

	nextNote() {
		// Advance current note and time by a 16th note...
		let secondsPerBeat = 60.0 / this.state.tempo; // Notice this picks up the CURRENT tempo to calculate beat length
		this.state.nextNoteTime += 0.25 * secondsPerBeat;

		this.setState({ current16thNote: this.state.current16thNote + 1 });
		if (this.state.current16thNote == 16) {
			this.setState({ current16thNote: 0 });
		}
	}

	play() {
		if (!this.state.unlocked) {
			// play silent buffer to unlock the audio
			const buffer = this.audioContext.createBuffer(1, 1, 22050);
			const node = this.audioContext.createBufferSource();
			node.buffer = buffer;
			node.start(0);
			this.setState({ unlocked: true });
		}

		this.setState({ isPlaying: !this.state.isPlaying });

		if (this.state.isPlaying) { // start playing
			this.setState({
				current16thNote: 0,
				nextNoteTime: this.audioContext.currentTime
			});
			this.scheduler();
			this.metronom();
		}

		if (!this.state.isPlaying) {
			clearInterval(this.Interval);
		}
	}

	constructor() {
		super();
		this.state = {
			unlocked: false,
			isPlaying: false,
			current16thNote: '', // What note is currently last scheduled?
			lookahead: 25.0, // How frequently to call scheduling function (in ms)
			tempo: 91.0, // tempo (in bpm)
			scheduleAheadTime: 0.1, // How far ahead to schedule audio (sec)
			nextNoteTime: 0.0, // when the next note is due.
			noteResolution: 0, // 0 == 16th, 1 == 8th, 2 == quarter note
			noteLength: 0.05 // length of "beep" (in seconds)
		};
		this.play = this.play.bind(this);
	}

	componentDidMount() {
		// if we wanted to load audio files, etc., this is where we should do it.
		this.audioContext = new window.AudioContext();
		this.notesInQueue = [];
	}

	render() {
		return (
			<div class={style.sequencerWrapper}>
				<div class={style.stepDisplay}>
					<button onClick={this.play}>
						{this.state.isPlaying ? 'STOP' : 'PLAY'}
					</button>
				</div>
				<div>
					{this.state.current16thNote}
				</div>
			</div>
		);
	}
}

export default DrumMaschine;
