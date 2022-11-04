import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getUsers } from "app/apis/apiMethods";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { JsonWebTokenError } from "jsonwebtoken";
import { Link, Fab, Icon } from "@mui/material";

const images = process.env.REACT_APP_API_URL
const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

const ViewProfile = () => {
  const {  user } = useAuth();
  console.log("user", user);
  const navigate = useNavigate();
         const Data = async () => {
         const users = await getUsers('/user/profile/${id}')
         console.log("users", users)
}

// useEffect(()=>{
//   Data()
// },[])
 return (
    <Card className="card">
      <Grid container>
        <Grid item sm={12} xs={12}>
          <Box p={4} height="100%">
            <img src={images + user.profile_image} alt="pofile picture" />
            <h1>{user.full_name}- FullName</h1>
            <h1>{user.user_name} -UserName</h1>
            <h1>{user.email}- Email</h1>
            <h1>{user.contact_number} -Contact Number</h1>
            
            <Fab  onClick={()=>{navigate(`/editusers/${user._id}`)}} color="secondary" aria-label="Edit" className="button">
            <Icon>edit_icon</Icon>
             </Fab>
          </Box>
        </Grid>
      </Grid>
    </Card>

  )
}
export default ViewProfile;