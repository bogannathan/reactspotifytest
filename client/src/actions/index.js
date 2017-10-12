import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CREATE_FUNDS, 
  DELETE_FUND,
  FETCH_FUNDS

  } from './types';

  import authReducer from '../reducers/auth_reducer';

  const ROOT_URL = 'http://localhost:3000/api';

  var config = {
       headers: { authorization: localStorage.getItem('token') }
    }

    export function signinUser({ email, password }){
      return function(dispatch){
        axios.post(`${ROOT_URL}/login`, {email, password})
          .then(response => {
        console.log(response);
            dispatch({ type: AUTH_USER });
            localStorage.setItem('token', response.data.sessionToken);
            browserHistory.push('/new_fundraiser');
            
             })
          .catch(response =>  dispatch(authError("There was a something wrong with your request.")));
      }
    }

    export function signoutUser(){
       localStorage.removeItem('token'); 
       return {type: UNAUTH_USER};
    }


    export function signupUser({ email, password }) {
          return function(dispatch) {
            // Submit email/password to the server
            axios.post(`${ROOT_URL}/user`, { email, password })
              .then(response => {
                dispatch({type: AUTH_USER});
                  
                  //update the token
                  localStorage.setItem('token', response.data.sessionToken);
                  browserHistory.push('/new_fundraiser');
              })
              .catch(response => dispatch(authError(response.data.error)));
          }
        }

    export function createFund(props) {
      // console.log(props);
      return function(dispatch){
        axios.post(`${ROOT_URL}/fund`, { props }, {
       headers: { authorization: localStorage.getItem('token') }
    } )
        .then(request => {
            dispatch({
              type: CREATE_FUNDS,
              payload: request
            })
          browserHistory.push('/fundraisers');
        });
      }
    }

    export function fetchFunds() {
      return function(dispatch) {
        axios.get(`${ROOT_URL}/fund`, config)
          .then( (response) => {
            console.log("Response", response)
            dispatch({
              type: FETCH_FUNDS,
              payload: response
            });
          });
      }
    }
    export function authError(error) {
      return {
        type: AUTH_ERROR,
        payload: error
      };
    }

    export function deleteFund(id) {
      return function(dispatch) {
        axios.delete(`${ROOT_URL}/fund/${id}`, config)
          .then( (response) => {
            dispatch({
              type: DELETE_FUND,
              payload: response
            });
          });
  }
}