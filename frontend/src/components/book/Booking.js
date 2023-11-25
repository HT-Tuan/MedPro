import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Stepper, Step, StepLabel } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { newTicket, clearErrors } from '../../actions/ticketAction'
import Loader from '../layouts/Loader';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const Booking = () => {
  const navigate = useNavigate();
  const { doctor } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [record, setRecord] = useState('');
  const [date, setDate] = useState('');
  const [book, setBook] = useState({
    category: '',
    area: '',
    time: '',
  })

  const handleDataStep1 = (data) => {
    setRecord(data);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  const handleDataStep2 = (data) => {
    setDate(data);
  }
  const handleDataStep3 = (data) => {
    setBook(data);
  }
  const handleNext = () => {
    if (date === '') {
      toast.error('Vui lòng chọn ngày khám', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  const steps = [
    { label: 'Chọn hồ sơ', component: <Step1 onData={handleDataStep1} /> },
    { label: 'Chọn ngày khám', component: <Step2 doctor_id={doctor} handleData={handleDataStep2} /> },
    { label: 'Chọn loại khám', component: <Step3 handleData={handleDataStep3} /> },
  ];

  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(state => state.ticket);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Đặt lịch khám thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
      const user = localStorage.getItem('user');
      const email = JSON.parse(user).email;
      toast.success(`Phiếu khám đã đươc gửi về địa chỉ email: ${email}`, {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => {
          navigate(`/`);
          window.location.reload();
        }
      });
    }
  }, [dispatch, error, success]);
  const handleBooking = () => {
    if (book.category === '' || book.area === '' || book.time === '') {
      toast.error('Vui lòng chọn đầy đủ thông tin', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    try {
      dispatch(newTicket(doctor, record, book.category, book.area, date, book.time));
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Đặt lịch khám'} />
          <div className='d-flex flex-column align-items-center'>
            <div className='justify-content-center'>
              <Stepper className='mt-4' style={{ width: '100%' }} activeStep={activeStep} orientation='horizontal'>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepLabel>{step.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
          <div>
            {steps[activeStep].component}
          </div>
          <div className="button-container">
            {activeStep > 0 && (
              <button className="button-back mt-3" onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}>Trở lại</button>
            )}
            {activeStep === 0 && (<Link to={`/`} className="button-back mt-3">Trở lại</Link>)}
            {activeStep === 1 && <button className="button-next mt-3" onClick={handleNext}>Tiếp theo</button>}
            {activeStep === 2 && <button className="button-next mt-3" onClick={handleBooking}>Đặt khám</button>}
          </div>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  )
}

export default Booking;