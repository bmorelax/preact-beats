import { h, Component } from 'preact';
import Sequencer from '../components/Sequencer';

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<Sequencer />
			</div>
		);
	}
}
