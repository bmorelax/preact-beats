/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
import { Component } from 'preact';
import style from './style';

const Pad = ({ active }) => {
	console.log(active);
	if (active) {
		return (
			<div class={style.activePad}>
			</div>
		);
	}
	return (
		<div class={style.notActivePad}>
		</div>
	);
};

export default Pad;