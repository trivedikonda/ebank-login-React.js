import {Component} from 'react'

import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmit = async e => {
    e.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {userId, pin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/ebank/login', options)
    console.log(response)

    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserId = e => this.setState({userId: e.target.value})

  onChangePin = e => this.setState({pin: e.target.value})

  render() {
    const {userId, pin, showSubmitError, errorMsg} = this.state
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <div>
            <h1>Welcome Back!</h1>
            <form onSubmit={this.onSubmit}>
              <div>
                <label htmlFor="userId">User ID</label>
                <input
                  type="text"
                  value={userId}
                  id="userId"
                  placeholder="Enter User ID"
                  onChange={this.onChangeUserId}
                />
              </div>
              <div>
                <label htmlFor="pin">PIN</label>
                <input
                  value={pin}
                  id="pin"
                  type="password"
                  placeholder="Enter PIN"
                  onChange={this.onChangePin}
                />
              </div>
              <button type="submit">Login</button>
              {showSubmitError && <p>{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
