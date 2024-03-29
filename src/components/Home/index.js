import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login/" />
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <>
      <nav>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png "
          alt="website logo"
        />
        <button type="button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
      <div>
        <h1>Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png "
          alt="digital card"
        />
      </div>
    </>
  )
}

export default Home
