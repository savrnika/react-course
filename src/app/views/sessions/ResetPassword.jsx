import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import { useState,useEffect } from 'react';
import { Navigate, useNavigate} from 'react-router-dom';
import { putUsers } from 'app/apis/apiMethods';
import axios from 'axios';
import { Password } from '@mui/icons-material';

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

const ResetPasswordRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    margin: '1rem',
    borderRadius: 12,
  },
}));

const ResetPassword = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()

  const _id = localStorage.getItem('_id');
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = {
      password: password,
      confirmpassword:confirmpassword,
      _id
    };
    await putUsers(data).then(
      res => {
        setPassword(res.userId)
        setId(res.data.userId)
        console.log(res)

      }
    ).catch(
      err => {
        console.log(err)
      })
    //console.log(email);
    
  };
  // useEffect(() => {
  //   if (items) {
  //    setId(items);
  //   }
  // }, []);

  return (
    <ResetPasswordRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <JustifyBox p={4}>
              <img width="300" src="/assets/images/illustrations/dreamer.svg" alt="" />
            </JustifyBox>

            <ContentBox>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  type="password"
                  name="password"
                  size="small"
                  label="Password"
                  value={password}
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 3, width: '100%' }}
                />
                <TextField
                  type="confirm-password"
                  name=" confirm-password"
                  size="small"
                  label="confirm-Password"
                  value={confirmpassword}
                  variant="outlined"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mb: 3, width: '100%' }}
                />

                <Button fullWidth variant="contained"  color="primary" type="submit">
                  Submit
                </Button>
                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate('/session/signin')}
                  sx={{ mt: 2 }}
                >
                  Go Back
                </Button>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </ResetPasswordRoot>
  );
};

export default ResetPassword;



// onClick={()=>{navigate(/session/signin)}}




// const [count, setCount] = useState(0);

//   useEffect(() => {
//     setTimeout(() => {
//       setCount((count) => count + 1);
//     }, 1000);
//   });
