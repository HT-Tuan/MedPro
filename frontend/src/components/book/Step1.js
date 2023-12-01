import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../layouts/Loader'
import { Grid, Paper, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { getRecords } from '../../actions/recordAction'

const Step1 = ({ onData }) => {
  document.body.style.backgroundColor = "#fff";
  const [currentPage, setCurrentPage] = useState(0)
  const columns = [
    { id: 'stt', name: 'STT' },
    { id: 'fullname', name: 'Họ và tên' },
    { id: 'phone', name: 'Số điện thoại' },
    { id: 'birthday', name: 'Ngày sinh' },
    { id: 'address', name: 'Địa chỉ' },
    { id: 'action', name: 'Hành động' }
  ]
  const dispatch = useDispatch();
  const { loading, error, records, recordsCount, resPerPage } = useSelector(state => state.record);
  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    dispatch(getRecords('', currentPage));
  }, [dispatch, error, toast, currentPage]);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <Grid className='mt-5'>
            <Paper elevation={15} className='paperList'>
              <div className='recordList'>
                <h4 className='titleRecord'>DANH SÁCH HỒ SƠ</h4>
              </div>
              <div className='paperList'>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow className='tableRowList'>
                        {columns.map((column) =>
                          <TableCell className="font-weight-bold" key={column.id}>{column.name}</TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {records && records.map((record, index) => (
                        <TableRow key={record._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{record.fullname}</TableCell>
                          <TableCell>{record.phone}</TableCell>
                          <TableCell>{new Date(record.birthday).toLocaleDateString('vi-VN')}</TableCell>
                          <TableCell>{record.address}</TableCell>
                          <TableCell>
                            <Button className='mr-2' onClick={() => { onData(record._id) }} variant="contained" color="primary" title="Chọn">Chọn</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={recordsCount}
                  rowsPerPage={resPerPage}
                  page={currentPage}
                  onPageChange={handlePageChange}
                >
                </TablePagination>
              </div>
            </Paper>
          </Grid>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  )
}

export default Step1
