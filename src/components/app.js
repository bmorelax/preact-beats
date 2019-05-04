import { h, Component } from 'preact';
import DrumMachine from '../components/DrumMachine';

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<DrumMachine />
			</div>
		);
	}
}
