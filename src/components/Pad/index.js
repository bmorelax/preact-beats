/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
import { Component } from 'preact';
import style from './style';

const Pad = ({ active, number, trackNumber, updateClips }) => {
	if (active) {
		return (
			<div class={style.activePad} />
		);
	}
	return (
		<div class={style.notActivePad} />
	);
};

export default Pad;