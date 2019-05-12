import * as types from '../constants/action-types';

export function start() {
	return {
		type: types.START
	};
}

export function changeColor(payload) {
	return {
		type: types.COLOR,
		payload
	};
}

export const updateClips = payload => ({
	type: types.UPDATE_CLIPS,
	payload
});

export const changeTempo = payload => ({
	type: types.CHANGE_TEMPO,
	payload
});

export const playPause = payload => ({
	type: types.PLAY_PAUSE,
	payload
});

export const updateSamplers = payload => ({
	type: types.UPDATE_SAMPLERS,
	payload
});

export const changeCurrentStep = payload => ({
	type: types.CHANGE_CURRENT_STEP,
	payload
});

export const updateBuffers = payload => ({
	type: types.UPDATE_BUFFERS,
	payload
});

export const initReduxBumpkit = (mixer, clips, samplers, isPlaying) => (dispatch) => {
	dispatch(updateMixer(mixer));
	dispatch(updateClips(clips));
	dispatch(updateSamplers(samplers));
	dispatch(playPause(isPlaying));
};

export const updateMixer = payload => ({
	type: types.UPDATE_MIXER,
	payload
});

export const updateTracks = payload => ({
	type: types.UPDATE_TRACKS,
	payload
});

export const updateLoading = payload => ({
	type: types.IS_LOADING,
	payload
});

export const readyToPlay = payload => ({
	type: types.READY,
	payload
});