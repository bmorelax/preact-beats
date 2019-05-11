import { h, Component } from 'preact';
import Sequencer from '../components/Sequencer';
import configureStore from '../store/configureStore';
import { Provider } from 'preact-redux';

const store = configureStore();

const App = () => (
	<Provider store={store}>
		<Sequencer />
	</Provider>
);


export default App;