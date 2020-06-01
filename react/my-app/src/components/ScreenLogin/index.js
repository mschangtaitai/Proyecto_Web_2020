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
      <h1> bienvenido </h1>
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

  /*

  const LoginScreen = (props) => {
    const [userName, changeUserName] = useState('');
    const [password, changePassword] = useState('');
    const [userLogged, setUserLogged] = useState('');
    const loggedIn = props.loggedIn
    const pathLink = ''


    const onPressLogin = () => {

      console.log(userName, password)

      if (userName !== '' || password !== '') {
        console.log('no es null')
        //TODO TO VALIDATE THE USERuserName AND PASSWORD 
        //IN DB
        if (userName === 'admin' && password === 'admin') {
         history.push('/user/admin')
        } else {
          console.log("voy a buscar")

          const request = new Request('http://localhost:3001/login',{
            method:'POST',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify({userName:userName,password:password})
          })
          fetch(request).then(res => {
            return res.json()}
          )
          .catch(error => console.error('Error:', error))
          .then(res => {
            console.log('Success:', res)

            if (res.length > 0) {
              setUserLogged([...userLogged, ...res])
              console.log(res)
              const usernameid = res[0].userid
              //console.log(userName)
              const pathLink = '/user/' + usernameid
              history.push(pathLink)
            } 
          }) 
          
    

            
     

          
        }
      } 

    }

    const onPressSignUp = () => {

      if (userName !== null && password !== null) {
        //TODO TO VALIDATE THE USERuserName AND PASSWORD 
        //IN DB


      }

    }
    {console.log("el logged in esta en:" + loggedIn)}

    if (loggedIn === true) {
      return <User />
    }


    if (userLogged.length === 0 ) {
      return (

        <div className="form container login">

          <div className='row'>
          <div className='col-12'>
            <h1>Log In</h1>
          </div>
          </div>

          <div className='row'>
            <div className='col-12'>  



            
            <form action="/sign-up" method="POST" >
            
            <div className="input-group mb-3">
                  <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">@</span>
                  </div>
                <input 
                  type="text" className="form-control" placeholder="Username" 
                  aria-label="Username" aria-describedby="basic-addon1" 
                  value={userName} onChange={e => changeUserName(e.target.value)}/>
            </div>

            <div className="input-group mb-3">
                  <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">*</span>
                  </div>
                <input 
                  type="password" className="form-control" placeholder="password" 
                  aria-label="password" aria-describedby="basic-addon1" 
                  value={password} onChange={e => changePassword(e.target.value)}/>
            </div>

            <div className='row'> 
            <div className='col-12'>
              <Link to={{pathname: (pathLink)} }>
                <button type="submit" className='btn btn-primary' onClick={onPressLogin}>
                    Submit
                </button>
              </Link>
            </div>
            </div>




            <p>¿No tienes una cuenta?</p>
            <div className='row'> 
            <div className='col-12'> 
            <Link to={{pathname: '/sign-up'} }>
              <button type="submit" className='btn btn-primary ' onClick={onPressSignUp}>
                Sign up
              </button>
            </Link>
            </div>
            </div>
              

           </form>
           </div>
          </div>
        </div> 
   
      );
    }



    return <User />




  } 

  export default LoginScreen
  */