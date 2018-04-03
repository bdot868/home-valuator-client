import React, {Component} from 'react';
// import Loader from './loader'


class LogIn extends Component {
  _handleLogin(evt) {
    evt.preventDefault()
    const credentials = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.onLogin(credentials)
  }

  render() {
    return (
      <div className='container'>
        <h1>Log In</h1>
        <form className="form-horizontal" onSubmit={this._handleLogin.bind(this)}>
          <div className="form-group">
            {/* <label className="col-sm-2 control-label">Email</label> */}
            <div className="col-sm-10">
              <input className="form-control" type="text" placeholder="Email" ref="email" id='log-in'/>
            </div>
          </div>
          <div className="form-group">
            {/* <label className="col-sm-2 control-label">Password</label> */}
            <div className="col-sm-10">
              <input className="form-control" type="password" placeholder="Password" ref="password" id="log-in"/>
            </div>
          </div>
          <div>
            <div className="form-group">
              <button type="submit" className="btn btn-success" >Log In</button>
            </div>
          </div>
        </form>
      </div>

    )
  }
}

export default LogIn;
