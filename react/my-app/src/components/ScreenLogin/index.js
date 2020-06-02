import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import { connect } from 'react-redux'
import LoginForm from '../LogIn/index'
import * as selectors from '../../reducers'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../NavBar/index'
// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

export const ScreenLogin = ({ authUsername = ''}) => {

  if (authUsername != null) {
    console.log(authUsername)
    return (
      <NavBar />
    )
  }

  return (
    <Router>
      <div>
        <div className='container'>
          <div className='row menuAuth'>
              <div className='col-sm-12'>
              <li>
                <Link exact to="/home" className='link'>Home</Link>
              </li>

              </div>
              <div className='col-sm-12'>
              <li>
                <Link to="/sign-up" className='link'>Sign Up</Link>
              </li>

              </div>
              <div className='col-sm-12'>
              <li>
              <Link to="/log-in" className='link'>Log in</Link>

              </li>
              </div>
          </div>
        </div>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/log-in">
            <LoginForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => {
  return <h1> HOME</h1>
}
function AuthButton({isAuthenticated}) {
  let history = useHistory();

  return {isAuthenticated} ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          console.log('boton para sign out')
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <ProtectedPage />)

}

const SignUp = ()  => {
  return <h3>SignUp</h3>;
}


const ProtectedPage = ()  => {
  return <h3>Protected</h3>;
}


export default connect(
    state => ({
         authUsername: selectors.getAuthUsername(state),
    })
  )(ScreenLogin);



