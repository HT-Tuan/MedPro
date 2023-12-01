import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import { useParams } from 'react-router-dom';
import {Grid, Paper, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from './Sidebar';
import { getAllUsers, deleteUser } from '../../actions/userAction'

const UserAdmin = () => {
  document.body.style.backgroundColor = "#fff";
  const [currentPage, setCurrentPage] = useState(0)
  //
  const columns = [
    { id: 'stt', name: 'STT' },
    { id: 'fullname', name: 'Họ và tên' },
    { id: 'email', name: 'Email' },
    { id: 'gender', name: 'Giới tính' },
    { id: 'birthday', name: 'Ngày sinh' },
    { id: 'action', name: 'Hành động' }
  ]
  // 

  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { loading, error, users } = useSelector(state => state.adminUsers);

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    dispatch(getAllUsers(keyword, currentPage));
  }, [dispatch, error, toast, keyword, users.currentPage]);
  //
  let count = users.usersCount;
  const resPerPage = users.resPerPage;
  if (keyword) {
    count = users.filteredUsersCount
  }
  //
  const handleDelete = (user) => {
    if (window.confirm(`Bạn có chắc muốn xóa người dùng ${user.fullname}?`)) {
      dispatch(deleteUser(user._id))
        .then(() => {
          toast.success("Xóa người dùng thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(getAllUsers(keyword, currentPage));
        })
        .catch((error) => {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  }

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Fragment>
      <MetaData title={'Quản lý người dùng'} />
      {loading ? <Loader /> : (
        <div className='row'>
          <div className="col-12 col-md-2">
            <Sidebar />
          </div>
          <div className="col-12 col-md-10">
            <Fragment>
              <Grid className='mt-5'>
                <Paper elevation={15} className='paperList'>
                  <div className='recordList'>
                    <h4 className='titleRecord'>DANH SÁCH NGƯỜI DÙNG</h4>
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
                          {users.users && users.users.map((user, index) => (
                            <TableRow key={user._id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{user.fullname}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.gender}</TableCell>
                              <TableCell>{new Date(user.birthday).toLocaleDateString('vi-VN')}</TableCell>
                              <TableCell>
                                <Button className='mr-2' onClick={() => { handleDelete(user) }} variant="contained" color="error" title="Xóa"><DeleteIcon /></Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[]}
                      component="div"
                      count={count}
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
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default UserAdmin
