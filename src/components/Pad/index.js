/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
import { Component } from 'preact';
import style from './style';

class Pad extends Component {
	render() {
		return (
			<div class={style.button} onClick={() => console.log('onClick')}>
					BUM
			</div>
		);
	}
}

export default Pad;