export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";

export function setAccessToken(token) {
	return { type: SET_ACCESS_TOKEN, payload: token };
}
export function setSearchResults(results) {
	return { type: SET_SEARCH_RESULTS, payload: results };
}
