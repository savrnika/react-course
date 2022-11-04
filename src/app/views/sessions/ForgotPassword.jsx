import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postClient, postUsers } from 'app/apis/apiMethods';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import { verify } from 'jsonwebtoken';
import VerifyEmail from './VerifyEmail';
import { useEffect } from 'react';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default,
}));

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    margin: '1rem',
    borderRadius: 12,
  },
}));

const ForgotPassword = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState("");
  const [id, setId] = useState("");


  const handleFormSubmit = async (e) => {

    e.preventDefault();

    const data = {
      email: email,
      // otp:otp
    };
    await postUsers(data).then(
      res => {
        console.log("data",res.userId)
        localStorage.setItem('_id', res.userId);
        if (res.data === VerifyEmail) {
          return (otp.data)
        }

        setEmail(res.data)
        console.log(res.userId)
        setId(res.userId)
        alert("send otp")
      }
    ).catch(
      err => {
        console.log(err)
        alert("changepassword");
      })

    //console.log(email);
    // navigate("/session/reset-password");
  };
  // useEffect(() => {
  //       setEmail(() => {
  //         setOtp((otp) => otp);
  //       });
  //     });


  return (
    <ForgotPasswordRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <JustifyBox p={4}>
              <img width="300" src="/assets/images/illustrations/dreamer.svg" alt="" />
            </JustifyBox>

            <ContentBox>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  type="email"
                  name="email"
                  size="small"
                  label="Email"
                  value={email}
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3, width: '100%' }}
                />
                <Button fullWidth variant="contained" color="primary" type="submit">
                  send Otp
                </Button>

                <TextField
                  type="otp"
                  name="otp"
                  placeholder="enter otp"
                  onChange={(e) => setOtp(e.target.value)}
                />

                <Button fullWidth variant="contained"
                  onClick={async () => {
                    const data = {
                      otp: otp,
                      _id: id
                    };
                    console.log('this is what', data)

                    await postUsers(data).then(
                      res => {
                        console.log(res)
                        if (res.status) {
                          navigate('/session/reset-password')
                        } else {
                          alert(res.message)
                        }
                      }
                    ).catch(
                      err => {
                        console.log(err)
                      })
                     }}

                  color="primary" type="submit">
                  changepassword
                </Button>

                
                {/* <Button
                  fullWidth
                  color="primary"
                  onClick={async () => {
                    const data = {
                      email: email,
                      
                    };
                    console.log('this is what', data)

                    await postClient(data).then(
                      res => {
                        console.log(res)
                        if (res.status) {
                          navigate(`/user/forgotPassword`)
                        } else {
                          alert(res.message)
                        }
                      }
                    ).catch(
                      err => {
                        console.log(err)
                      })
                     }}
                  variant="outlined"
                  // onClick={()=>{navigate(`/user/forgotPassword`)}}
                  sx={{ mt: 2 }}
                >
                  
                  resend otp
                </Button> */}

                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{ mt: 2 }}
                >
                  Go Back
                </Button>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </ForgotPasswordRoot>
  );
};

export default ForgotPassword;
