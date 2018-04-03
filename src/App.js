import React, { Component } from 'react';
import './App.css'
import clientAuth from './clientAuth'
import Home from './home'
import Profile from './profile'
import LogIn from './login'
import SignUp from './signup'
import Zillow from './zillow'

// import LoadingSpinner from './spinner'
// var ReactBootstrap = require('react-bootstrap')
// var Modal = ReactBootstrap.Modal


class App extends Component {

  constructor(){
    super()
    this.state = {
      currentUser: null,
      loggedIn: false,
      dataSetLocation: null,
      view: 'home'
    }
    this._login=this._login.bind(this)
    this._signUp=this._signUp.bind(this)
    this._zillowData=this._zillowData.bind(this)
  }

  componentDidMount() {
    const currentUser = clientAuth.getCurrentUser()
    this.setState({
      currentUser: currentUser,
      loggedIn: !!currentUser,
    })
  }

  _signUp(newUser) {
    clientAuth.signUp(newUser).then((data) => {
      console.log(data)
      this.setState({
        view: 'login'
      })
    })
  }

  _login(credentials) {
    clientAuth.logIn(credentials).then(user => {
       this.setState({
          currentUser: user,
          loggedIn: true,
          view: 'zillow'
        })
      })
  }

  _logOut() {
    clientAuth.logOut().then(message => {
      this.setState({
        currentUser: null,
        loggedIn: false,
        view: 'home'
      })
    })
  }


  _setView(evt) {
    evt.preventDefault()
    console.log(evt.target)
    const view = evt.target.name
    this.setState({
      view: view
    })
  }

  _zillowData(data) {

    clientAuth.getLocationInfo(data)
      .then((apiLocationData) => {

        console.log(apiLocationData)
        var mula = parseInt(apiLocationData.data.zestimate, 10);
        this.setState({
          dataSetLocation: apiLocationData.data,
          view: apiLocationData ? 'zillow' : 'spinner',
          value: mula
        })
      });

  }

  _clearSearch() {
    this.setState({
      dataSetLocation: null
    })
  }

  _home() {
    this.setState({
      view: 'home'
    })
  }



  render() {
    var listing = this.state.dataSetLocation


    return (
      <div className="App">

        <header>
          <div className="logo">
            <a name="home" onClick={this._home.bind(this)}>Home Valuator</a>
          </div>

          <nav>
            <ul className="links">
              {!this.state.loggedIn && (
                <li className="navi-link"><a name='signup' onClick={this._setView.bind(this)}>Sign Up</a></li>
              )}
              {!this.state.loggedIn && (
                <li className="navi-link"><a name='login' onClick={this._setView.bind(this)}>Log In</a></li>
              )}
              {this.state.loggedIn &&(
                <li className="navi-link"><a name='zillow' onClick={this._setView.bind(this)}>Zillow</a></li>
              )}
              {this.state.loggedIn && (
                <li className="navi-link"><a name='profile' onClick={this._setView.bind(this)}>Profile</a></li>
                )}
              {this.state.loggedIn && (
                <li className="navi-link"><a name='logout' onClick={this._logOut.bind(this)}>Log Out</a></li>
              )}
            </ul>
          </nav>
        </header>


        <div className="page">
        {{
          home: <Home />,
          // spinner: <LoadingSpinner />,
          login: <LogIn onLogin={this._login} />,
          signup: <SignUp onSignup={this._signUp} />,
          profile: <Profile myUser={this.state.currentUser} quotes={listing} onDismissModal={this._clearSearch.bind(this)} estValue={this.state.value}/>,
          zillow: (
            <Zillow
              onSearch={this._zillowData}
              data={this.state.dataSetLocation}
              onDismissModal={this._clearSearch.bind(this)}
              money={this.state.value}
            />
          )
        }[this.state.view]}
      </div>
      <section>
        <div id="zestimate-info">
          <h4>What is a Zestimate®?</h4>
          <p>The Zestimate home valuation is Zillow's estimated market value for a home, computed using a proprietary formula. It is a starting point in determining a home's value and is not an official appraisal. The Zestimate is calculated from public and user-submitted data. Updating your home facts can help make your Zestimate more accurate. Learn more</p>

          <h4>Other ways to find out the value of your home</h4>
          <p>Zestimates are intended as a useful starting point to help you determine an independent and unbiased assessment of what your home might be worth in today's market. Comparing your home to recently sold properties can also help you understand what your home is worth. Additionally, your real estate agent or appraiser will physically inspect the home and take into account special features, location and market conditions.</p>
        </div>
      </section>
        <footer>
          <p>Copyright 2017 Home Valuator</p>
        </footer>
      </div>
    );
  }
}



export default App;
