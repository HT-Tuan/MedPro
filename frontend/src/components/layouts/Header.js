import React, { Fragment } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Search from './Search';

import "../../App.css";
const Header = ({ isAuth }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/logo.png" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          {!isAuth && <Search navigate={navigate} />}
        </div>

        {!isAuth && <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <button id="ticket_btn" className="btn ml-3">Phiếu khám</button>
          <button id="login_btn" className="btn ml-3">Login</button>
        </div>}
      </nav>
    </Fragment>
  )
}

export default Header
