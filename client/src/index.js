//SET UP
import React from 'react'; //React 
import ReactDOM from 'react-dom'; //Allows components to be rendered in the DOM
import { Provider } from 'react-redux'; //Highest order component; allows for binding Redux to React
import { createStore, applyMiddleware } from 'redux'; //createStore- creates Redux store which holds app's total state
													//applyMiddleware- receives middleware functions and stores them
import { Router, Route, IndexRoute, browserHistory } from 'react-router'; //react-router- ensures url and UI are in-sync
import reduxThunk from 'redux-thunk'; //allows action creators that return functions instead of actions

//IMPORT COMPONENTS & REDUCERS
import App from './components/app'; 
import Splash from './components/splash';
import Albums from './components/albumid';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore); //just like it sounds- receives middleware and
																//creates a Redux store to hold everything						
const store = createStoreWithMiddleware(reducers); //stores reducers 



//RENDER COMPONENTS IN THE DOM
ReactDOM.render(  
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>

            <Route path="albumid" component={Albums} />     
            <Route path="splash" component={Splash} />

        </Route>
      </Router>
  </Provider>
  , document.querySelector('.container'));