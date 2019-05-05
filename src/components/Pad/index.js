/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
import { Component } from 'preact';
import style from './style';

const Pad = ({ active, number, trackNumber }) => {
	console.log(`Number: ${number} TrackNumber: ${trackNumber}`);
	if (active) {
		return (
			<div onClick={() => console.log('test')} class={style.activePad}>
			</div>
		);
	}
	return (
		<div onClick={() => console.log('test')} class={style.notActivePad}>
		</div>
	);
};

export default Pad;