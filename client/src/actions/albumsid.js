import * as types from '../constants/ActionTypes';
//import SpotifyApi from '../constants/Spotifier';

export function getAlbumsId(albumsId) {
  return dispatch => {
    dispatch(requestAlbumsId(albumsId));
    return SpotifyApi.getAlbumsId(albumsId, {limit: 40})
      .then(json =>dispatch(receiveArtistAlbums(json)))
      .catch(ex => {
        console.log('ex', ex);
      })
  };
}

function receiveAlbumsId(json) {
  return {
    type: types.RECEIVE_ALBUMS_ID,
    albums: json.items,
    total: json.total
  };
}

function requestAlbumsId() {
  return {
    type: types.REQUEST_ALBUMS_ID
  };
}

export function getAlbumsIdDetails(albumsId) {
  return dispatch => {
    dispatch(requestAlbumsIdDetails(albumsId));
    return SpotifyApi.getAlbumsId(albumsId, {limit: 40})
      .then(json => dispatch(receiveAlbumsIdDetails(json)))
      .catch(ex => {
        console.log('ex', ex);
      })
  };
}

function receiveAlbumsIdDetails(json) {
  return {
    type: types.RECEIVE_ALBUMS_ID_DETAILS,
    details: json
  };
}

function requestAlbumsIdDetails() {
  return {
    type: types.REQUEST_ALBUMS_ID_DETAILS
  };
}