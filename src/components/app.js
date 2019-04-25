import { h, Component } from 'preact';
import DrumMaschine from '../components/DrumMaschine';

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<DrumMaschine />
			</div>
		);
	}
}
