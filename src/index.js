import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';

import thunk from 'redux-thunk';

import {BrowserRouter} from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    burgerBuilderReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
