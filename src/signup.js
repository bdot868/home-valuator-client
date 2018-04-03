import React, {Component} from 'react';


class SignUp extends Component {
  _handleSignup(evt) {
    evt.preventDefault()
    const newUser = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.onSignup(newUser)
  }

  render() {
    return (
      <div className='container'>
        <h1>Sign Up</h1>
        <form className="form-horizontal" onSubmit={this._handleSignup.bind(this)}>
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Name" ref="name" />
          </div>
          <div className="form-group">
            <input className="form-control" type="email" placeholder="Email" ref="email" />
          </div>
          <div className="form-group">
            <input className="form-control" type="password" placeholder="Password" ref="password" />
          </div>
          <div>
            <button className="btn btn-success" type="submit">Create Account</button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp;
