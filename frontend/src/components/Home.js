import React, { Fragment, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Loader from './layouts/Loader'
import MetaData from './layouts/MetaData'
import Doctor from './doctor/Doctor'

import { useSelector, useDispatch } from 'react-redux'
import { getDoctors } from '../actions/doctorAction'


const Home = () => {
  document.body.style.backgroundColor = "#fff";
  const [currentPage, setCurrentPage] = useState(0)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, doctors, error, doctorsCount, resPerPage, filteredDoctorsCount } = useSelector(state => state.doctor)

  const { keyword } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      if(error.status === 401) {
        localStorage.removeItem('user');
        navigate('/login', { replace: true })
      }
      return;
    }
    dispatch(getDoctors(keyword, currentPage))
  }, [dispatch, toast, error, keyword, currentPage])

  function setCurrentPageNo(selectedPage) {
    setCurrentPage(selectedPage.selected)
  }
  let count = doctorsCount;
  if (keyword) {
    count = filteredDoctorsCount
  }
  const totalPages = Math.ceil(count / resPerPage);
  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Trang chủ'} />
          <section id='doctors' className='container mt-5'>
            <div className='row'>
              {doctors && doctors.map(doctor => (
                <Doctor key={doctor._id} doctor={doctor} col={4} />
              ))}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <ReactPaginate
                pageCount={totalPages}
                onPageChange={setCurrentPageNo}
                forcePage={currentPage}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                nextLabel=">"
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>)}
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home
