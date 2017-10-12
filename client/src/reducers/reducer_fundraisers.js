import { CREATE_FUND, FETCH_FUNDS, DELETE_FUND } from '../actions/types';

const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case CREATE_FUND:
			return { ...state, post: action.payload.data };
		case FETCH_FUNDS:
			return { ...state, funds: action.payload.data };
		case DELETE_FUND:
			return { ...state, deleted: action.payload.data };
		default:
			return state;
	}
}