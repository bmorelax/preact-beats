/* eslint-disable no-case-declarations */
/* Reducers:
Reducers specify how the application's state changes in response to actions sent to the stoe.
The reducer is a pure function. It always returns the same result if the same arguments are passed in and it does
not have any side effects.

The reducer takes the previous state and an action, and returns the next state.
*/
import * as types from '../constants/action-types';

const initialState = {
	audioPath: '//jxnblk.s3.amazonaws.com/stepkit',
	buffers: [],
	clips: [],
	color: 'red',
	currentBank: 0,
	currentKit: 0,
	currentStep: 0,
	tracks: [
		{ pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		{ pattern: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
		{ pattern: [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		{ pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		{ pattern: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
		{ pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
		{ pattern: [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1] },
		{ pattern: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0] }
	],
	isPlaying: false,
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
	],
	loopLength: 32,
	mixer: null,
	samplers: [],
	tempo: 96,
	volume: 1,
	isLoading: false,
	ready: false
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case types.UPDATE_CLIPS:
			return { ...state, clips: action.payload };
		case types.COLOR:
			return { ...state, color: action.payload };
		case types.CHANGE_CURRENT_STEP:
			return { ...state, currentStep: action.payload };
		case types.ADD_THINGS:
			return { ...state, things: action.payload };
		case types.UPDATE_BUFFERS:
			return { ...state, buffers: action.payload };
		case types.UPDATE_MIXER:
			return { ...state, mixer: action.payload };
		case types.UPDATE_SAMPLERS:
			return { ...state, samplers: action.payload };
		case types.UPDATE_TRACKS:
			const { trackNumber, number, updatedActive } = action.payload;
			// Make a copy of the tracks array
			let newTracks = state.tracks.slice();
			// Update Tracks
			newTracks[trackNumber].pattern.splice(number, 1, updatedActive);
			return { ...state, tracks: newTracks };
		case types.CHANGE_TEMPO:
			return { ...state, tempo: action.payload };
		case types.IS_LOADING:
			return { ...state, isLoading: action.payload };
		case types.READY:
			return { ...state, ready: action.payload };
		default:
			return state;
	}
}
