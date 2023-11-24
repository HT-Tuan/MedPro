import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Page500 = () => {
  const navigate = useNavigate();
  document.body.style.backgroundColor = "#f2eafd";
  return (
    <Box className="box">
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='h1' color='red' sx={{ fontWeight: 'bold' }}>
              500
            </Typography>
            <Typography variant='h6' color='primary' sx={{ fontWeight: 'bold' }}>
              Lỗi máy chủ
            </Typography>
            <Typography variant='h6' className='mb-3 typographyColor'>
              Là lỗi máy chủ không phải lỗi của bạn
            </Typography>
            <Button variant='contained' onClick={() => {
              navigate('/');
            }}>
              Quay trở lại
            </Button>
          </Grid>
          <Grid item xs={6}>
            <img className="img" src='/images/error-500.jpg' alt='404' />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Page500
