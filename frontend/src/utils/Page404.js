import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
  const navigate = useNavigate();
  document.body.style.backgroundColor = "#f2eafd";
  return (
    <Box className="box">
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='h1' color='red' sx={{ fontWeight: 'bold' }}>
              404
            </Typography>
            <Typography variant='h6' color='primary' sx={{ fontWeight: 'bold' }}>
              Không tìm thấy trang
            </Typography>
            <Typography variant='h6' className='mb-3 typographyColor'>
              Trang bạn đang tìm kiếm có thể đã bị xóa do đã thay đổi tên hoặc tạm thời không khả dụng.
            </Typography>
            <Button variant='contained' onClick={() => {
              navigate('/');
            }}>
              Quay lại trang chủ
            </Button>
          </Grid>
          <Grid item xs={6}>
            <img className="img" src='/images/error-404.jpg' alt='404' />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Page404
