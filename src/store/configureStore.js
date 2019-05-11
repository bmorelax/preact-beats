import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

// Check if window is available for prduction builds
function windowAvailable() {
	if (typeof window !== 'undefined') {
		return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	}
	return compose;
}

const composeEnhancers = windowAvailable();

export default () => {
	const store = createStore(
		reducer,
		composeEnhancers(applyMiddleware(thunk))
	);
	return store;
};