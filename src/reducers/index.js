import { combineReducers } from 'redux';
import SequencerReducer from './sequencer';

const rootReducers = combineReducers({
	sequencer: SequencerReducer
});

export default rootReducers;