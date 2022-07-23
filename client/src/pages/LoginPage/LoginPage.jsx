import { TextField, Typography } from '@mui/material'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-card crystal">
        <Typography variant="h5">
          Login
        </Typography>

        <TextField label="email"/>
        <TextField label="password"/>
      </div>
    </div>
  )
}

export default LoginPage

//#0055B8
//#0B6575
