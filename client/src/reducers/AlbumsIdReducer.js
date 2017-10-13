import {List, Map, fromJS} from 'immutable';
import * as types from '../constants/ActionTypes';

/*
 * This is the shape the state for the albumsId reducer will have.
 * Elements:
 *   isFetching: boolean indicator on whether a request is being performed to fetch an albums' details from Spotify's API
 *   items: a list of items containing information about each of the albums belonging to the requested
 *   album obtained from Spotify's API via requests
 */
const initialState = Map({
  isFetching: false,
  items: List(),
  details: Map(),
  total: 0
});

/*
 * Given an album which should come from an already-finished request to Spotify's API, this function
 * returns a new state with the 'items' field set to the array containing the albums which is provided as
 * an argument.
 *
 * Params:
 *   state: the current state to use in order to generate the next one
 *   albumsId: an object containing the requested album ids
 *
 * Returns: the new state with the 'items' field set to the artist albums provided as an argument
 */
function receiveAlbumsId(state, albumsId, totalIds) {
  var newState = fromJS({
    items: albumsId,
    isFetching: false,
    total: totalIds
  });
  return state.merge(newState);
}

/*
 * Sets the state's 'isFetching' field to true, in order to indicate that a request to fetch the a Spotify artist's albums
 * is currently in progress
 *
 * Params:
 *   state: the current state to use in order to generate the next one
 *
 * Returns: the new state with the 'isFetching' item set to true
 */
function requestAlbumsId(state) {
  let newState = Map({
    isFetching: true
  });
  return state.merge(newState);
}

/*
 * Given an artists' albums which should come from an already-finished request to Spotify's API, this function
 * returns a new state with the 'items' field set to the array containing the artist's albums which is provided as
 * an argument.
 *
 * Params:
 *   state: the current state to use in order to generate the next one
 *   artistAlbums: an object containing the requested artist albums
 *
 * Returns: the new state with the 'items' field set to the artist albums provided as an argument
 */
function receiveAlbumsIdDetails(state, albumsIdDetails) {
  var newState = fromJS({
    details: albumsIdDetails, // TODO: extract details from the correct property of the artistDetails object
    isFetching: false
  });
  return state.merge(newState);
}

/*
 * Sets the state's 'isFetching' field to true, in order to indicate that a request to fetch the a Spotify artist's albums
 * is currently in progress
 *
 * Params:
 *   state: the current state to use in order to generate the next one
 *
 * Returns: the new state with the 'isFetching' item set to true
 */
function requestAlbumsIdDetails(state) {
  let newState = Map({
    isFetching: true
  });
  return state.merge(newState);
}

/*
 * This is the main function which is responsible of reducing a state to a new one for a registered action, otherwise
 * it returns the same state it received.
 *
 * Params:
 *   state: the state from which the reducer shall start.
 *   action: an object containing at least a 'type' field with the action to perform on the passed state.
 *
 * Returns: the new state for the provided action or the same state if the passed action did not have a matching 'type'
 */
export default function albumsId(state=initialState, action) {
  switch(action.type) {
    case types.RECEIVE_ALBUMS_ID:
      return receiveAlbumsId(state, action.albums, action.total);

    case types.REQUEST_ALBUMS_ID:
      return requestAlbumsId(state);

    case types.RECEIVE_ALBUMS_ID_DETAILS:
      return receiveAlbumsIdDetails(state, action.details);

    case types.REQUEST_ALBUMS_ID_DETAILS:
      return requestAlbumsIdDetails(state);

    default:
      return state;
  }
}