import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import Loader from '../layouts/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getScheduledDoctors, clearErrors } from '../../actions/doctorAction';

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth && highlightedDays.some(highlightedDay =>
      highlightedDay.getDate() === day.date() &&
      highlightedDay.getMonth() === day.month() &&
      highlightedDay.getFullYear() === day.year()
    );
  return (
    <Badge
      key={props.day.toString()}
      className={isSelected ? 'highlighted-day' : ''}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}
const Step2 = ({ doctor_id, handleData }) => {
  const [value, setValue] = useState(dayjs());
  const [highlightedDays, setHighlightedDays] = useState([])
  const dispatch = useDispatch();
  const { scheduled, loading, error } = useSelector(state => state.scheduled);
  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(clearErrors());
      return;
    }
    dispatch(getScheduledDoctors(doctor_id));
  }, [dispatch, error, toast])
  useEffect(() => {
    if (scheduled) {
      let scheduledTemp = [];
      scheduled.map((item) => {
        scheduledTemp.push(new Date(item.date));
      })
      setHighlightedDays(scheduledTemp);
    }
  }, [scheduled])
  useEffect(() => {
    if (!highlightedDays.some(highlightedDay =>
      highlightedDay.getDate() === value.date() &&
      highlightedDay.getMonth() === value.month() &&
      highlightedDay.getFullYear() === value.year())
    ) {
      toast.warning('Vui lòng chọn ngày được tô màu', {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleData('');
    }
    else {
      handleData(value.format('YYYY-MM-DD'));

    }
  }, [value])

  const handleDateChange = (newValue) => {
    setValue(dayjs(newValue));
  }
  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar onChange={handleDateChange}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays,
                },
              }}
            />
          </LocalizationProvider>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  )
}

export default Step2
