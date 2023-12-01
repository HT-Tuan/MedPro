import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LineChart } from '@mui/x-charts/LineChart';
import { TextField } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Sidebar from './Sidebar'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'

import { getAdminTickets, getAdminStatisticsTickets, clearErrors } from '../../actions/ticketAction'
import { getDoctors } from '../../actions/doctorAction'
import { getAllUsers } from '../../actions/userAction'

const Dashboard = () => {
  let date = new Date();
  const [endDate, setEndDate] = useState(date.toISOString().slice(0, 10));
  let month = date.getMonth() - 10;
  if (month < 0) {
    month = 0;
  }
  date.setMonth(month);
  const [startDate, setStartDate] = useState(date.toISOString().slice(0, 10));

  const dispatch = useDispatch();
  const { loading, error, totalAmount, ticketCount } = useSelector(state => state.adminTickets);
  const { doctorsCount } = useSelector(state => state.doctor);
  const { users } = useSelector(state => state.adminUsers);
  const { xAxis, data } = useSelector(state => state.adminStatisticsTickets);
  useEffect(() => {
    if (error) {
      toast.error("Có lỗi", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(clearErrors());
    }
    dispatch(getAdminTickets());
    dispatch(getDoctors());
    dispatch(getAllUsers());
    dispatch(getAdminStatisticsTickets(startDate, endDate));
  }, []);
  useEffect(() => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    if (start.getFullYear() !== end.getFullYear()) {
      toast.error("Ngày bắt đầu và ngày kết thúc phải trong năm", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    dispatch(getAdminStatisticsTickets(startDate, endDate));
  }, [startDate, endDate]);
  const onChange = (e) => {
    if (e.target.name === 'startDate') {
      setStartDate(e.target.value);
    } else if (e.target.name === 'endDate') {
      setEndDate(e.target.value);
    }
  }
  return (
    <Fragment>
      <div className='row'>
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h2 className="my-4 titleDashboard">THỐNG KÊ</h2>

          {loading ? <Loader /> : (
            <Fragment>
              <MetaData title={'Bảng điều khiển'} />
              <div className="chart-container">
                <div className="date-picker-container">
                  <TextField
                    label='Ngày bắt đầu'
                    type='date'
                    fullWidth
                    required
                    name='startDate'
                    value={startDate}
                    className='mb-3'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={onChange}
                  />
                  <TextField
                    label='Ngày kết thúc'
                    type='date'
                    fullWidth
                    required
                    name='endDate'
                    value={endDate}
                    className='mb-3'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={onChange}
                  />
                </div>
                {xAxis && xAxis.length > 0 && data && data.length > 0 && (
                  <LineChart
                    xAxis={[{ data: xAxis }]}
                    series={[
                      {
                        label: 'Số lượng phiếu khám',
                        data: data,
                      },
                    ]}
                    width={500}
                    height={300}
                  />)}

              </div>
              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">Doanh thu<br /> <b>{totalAmount}.000</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">Bác sĩ<br /> <b>{doctorsCount}</b></div>
                    </div>
                    <Link className="card-footer text-white clearfix small z-1" to="/admin/doctors">
                      <span className="float-left">Xem chi tiết</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>


                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-danger o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">Phiếu khám<br /> <b>{ticketCount}</b></div>
                    </div>
                    <Link className="card-footer text-white clearfix small z-1" to="/admin/tickets">
                      <span className="float-left">Xem chi tiết</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>


                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">Người dùng<br /> <b>{users && users.usersCount}</b></div>
                    </div>
                    <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                      <span className="float-left">Xem chi tiết</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>


                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-warning o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">Hồ sơ khám bệnh<br /> <b>4</b></div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}

        </div>
      </div>
      <ToastContainer />
    </Fragment >
  )
}

export default Dashboard
