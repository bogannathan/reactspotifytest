import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import fundReducer from './reducer_fundraisers';
import { reduxForm as form } from 'redux-form';

	const rootReducer = combineReducers({
		auth : authReducer,
		form : formReducer,
		fund : fundReducer
	});
	export default rootReducer;
