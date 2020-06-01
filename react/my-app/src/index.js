import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import reducer from './reducers/';
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'
import { configureStore } from './store.js'
import ScreenLogin from './components/ScreenLogin/index'
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = configureStore();//TEMPORAL, NO PERSISTE AL REFRESH
// como deberia ser  pero para testear no me gusta
//const store = createStore(reducer,persistedState);
console.log(store)
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Route path="/" component={ScreenLogin}/>
      </Router>
    </PersistGate>

  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

