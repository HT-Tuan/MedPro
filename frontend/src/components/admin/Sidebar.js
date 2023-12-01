import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/admin/dashboard">Tổng kết</Link>
          </li>
          <li>
            <Link to="/admin/tickets"> Phiếu khám</Link>
          </li>

          <li>
            <Link to="/admin/doctors"><i className="fas fa-user-md"></i> Bác sĩ</Link>
          </li>
          <li>
            <Link to="/admin/users"><i className="fa fa-users"></i> Người dùng</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar