import React from "react";
import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Checkbox, Grid, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import { FormikProvider, useFormik,Form ,Formik} from "formik";
import { useState } from "react";
import { NavLink, useNavigate, useParams,Link } from "react-router-dom";
import * as Yup from "yup";
import { useEffect } from "react";
import { patchUsers,getUsers } from "app/apis/apiMethods";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));

const validationSchema = Yup.object().shape({
  full_name: Yup.string()
    .required("Name is required!"),
  user_name: Yup.string().required("Us er Name is required!"),
  contact_number: Yup.string().required("contact_number is required"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

export default function EditProfile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image,setImage]=useState('');
  const [update,setUpdate]=useState({full_name: "",
  user_name: "",
  contact_number: "",
  password: "",
  email: "",
  profile_image: ""

  });
  const [user, setUser] = useState();

  const { id } = useParams();


  const initialValues = {
    full_name: "",
    user_name: "",
    email: "",
    contact_number: "",
    
  };

  useEffect(async () => {
    const user = await getUsers(id);
    
    setUser(user.data);
    setFieldValue(`full_name`, user.data.full_name);
    setFieldValue(`user_name`, user.data.user_name);
    setFieldValue(`email`, user.data.email);
    setFieldValue(`contact_number`, user.data.contact_number);
    setFieldValue(`profile_image`,user.data.profile_image);
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    
   
    onSubmit: async (values) => {
       await patchUsers(id,update,values).then((res)=>{
         setUpdate(res)
         })
      setLoading(user.data);
       navigate("/profile");
     },
  });
  function handleChange(e) {
        console.log(e.target.files);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = formik;
  
  //console.log('touched',errors)
  return (
    <div>
      <h1>Edit users</h1>

      <Box width="100%" overflow="auto">
        <Grid item sm={6} xs={12}>
          <Box p={4} height="100%">
            <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
            {/* <img src={image + user.profile_image} alt="pofile picture" /> */}
              <TextField
                fullWidth
                size="small"
                type="text"
                name="full_name"
                label="fullname"
                variant="outlined"
                value={values.full_name}
                {...getFieldProps("full_name")}
                helperText={touched.full_name && errors.full_name}
                error={Boolean(errors.full_name && touched.full_name)}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                size="small"
                type="text"
                name="user_name"
                label="User name"
                variant="outlined"
                {...getFieldProps("user_name")}
                value={values.user_name}
                helperText={touched.user_name && errors.user_name}
                error={Boolean(errors.user_name && touched.user_name)}
                sx={{ mb: 3 }}
              />
             <TextField
                fullWidth
                size="small"
                type="text"
                name="email"
                label="email"
                variant="outlined"
                {...getFieldProps("email")}
                value={values.email}
                helperText={touched.email && errors.email}
                error={Boolean(errors.email && touched.email)}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                size="small"
                name="contact_number"
                type="number"
                label="Contact number"
                variant="outlined"
                value={values.contact_number}
                {...getFieldProps("contact_number")}
                helperText={touched.contact_number && errors.contact_number}
                error={Boolean(errors.contact_number && touched.contact_number)}
                sx={{ mb: 2 }}
              />
              
              
               <TextField
              //  <input type="file" onChange={handleChange} />
              //  <img src={file} />
                      fullWidth
                      size="small"
                      type="file"
                      name="profile_image"
                      label="Profile image"
                      variant="outlined"
                      values={values.profile_image}
                       sx={{ mb: 3 }}
                       onChange={(e) => setImage(e.target.files[0])}
                       
                    />
             
              <LoadingButton
                type="submit"
                color="primary"
                loading={loading}
                variant="contained"
                sx={{ mb: 2, mt: 3 }}
                //onClick={()=>{handleSubmit()}}
                
              >
                update
              </LoadingButton>
                <Paragraph>
                Already have an account?
                <NavLink
                  to="/session/signin"
                  style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                >
                  Login
                </NavLink>
              </Paragraph>
            </Form>
            </FormikProvider>
          </Box>
        </Grid>
      </Box>
    </div>
  );
}
