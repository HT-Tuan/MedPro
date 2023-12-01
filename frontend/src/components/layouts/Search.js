import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const Search = ({ navigate, isRecord }) => {
  const location = useLocation();
  const [keyword, setKeyword] = useState('')
  let str = "Nhập tên bác sĩ ..."
  if (location.pathname.startsWith('/admin/users')) {
    str = "Nhập tên người dùng ..."
  }
  const searchHandler = (e) => {
    e.preventDefault()
    if (!isRecord) {
      if (keyword.trim()) {
        if (location.pathname.startsWith('/admin/doctors'))
          navigate(`/admin/doctors/${keyword}`);
        else if (location.pathname.startsWith('/admin/users'))
          navigate(`/admin/users/${keyword}`);
        else
          navigate(`/search/${keyword}`);
      } else {
        if (location.pathname.startsWith('/admin/doctors'))
          navigate('/admin/doctors');
        else if (location.pathname.startsWith('/admin/users'))
          navigate('/admin/users');
        else
          navigate('/');
      }
    } else {
      if (keyword.trim()) {
        if (location.pathname.startsWith('/admin/tickets')) {
          navigate(`/admin/tickets/${keyword}`);
        } else
          navigate(`/me/records/${keyword}`);
      } else {
        if (location.pathname.startsWith('/admin/tickets')) {
          navigate('/admin/tickets');
        } else
          navigate('/me/records');
      }
    }
  }

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder={isRecord ? "Nhập tên bệnh nhân ..." : str}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  )
}

export default Search
