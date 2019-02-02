import { SET_ACCESS_TOKEN, SET_SEARCH_RESULTS } from "../actions/dataAction.js";

const initialState = {
	data: { access_token: undefined },
	search_results: []
};

export function dataReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ACCESS_TOKEN:
			return { ...state, data: { access_token: action.payload } };

		case SET_SEARCH_RESULTS:
			return { ...state, search_results: action.payload };
			
		default:
			return state;
	}
}
