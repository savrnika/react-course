import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

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

// inital login credentials
const initialValues = {
  full_name: "",
  user_name: "",
  email: "",
  password: "",
  confirm_password: "",
  contact_number: "",
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be 8 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
  full_name: Yup.string().required("Name is required!"),
  user_name: Yup.string().required("User name is required!"),
  contact_number: Yup.string().required("Contact number is required!"),
  confirm_password: Yup.string().required("Please confirm password!")
});

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate()

  const handleFormSubmit = (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("user_name", values.user_name);
    formData.append("email", values.email);
    if (values.confirm_password === values.password) {
      formData.append("password", values.password);
    };
    formData.append("contact_number", values.contact_number);
    formData.append("profile_image", image);
    try {
      register(formData);
      navigate("/")
      setLoading(false);
      
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="full_name"
                      label="Full name"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e)}
                      helperText={touched.full_name && errors.full_name}
                      error={Boolean(errors.full_name && touched.full_name)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="user_name"
                      label="Username"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e)}
                      helperText={touched.user_name && errors.user_name}
                      error={Boolean(errors.user_name && touched.user_name)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e)}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e)}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="confirm_password"
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e)}
                      helperText={
                        touched.confirm_password && errors.confirm_password
                      }
                      error={Boolean(
                        errors.confirm_password && touched.confirm_password
                      )}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      name="contact_number"
                      label="Contact number"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e)}
                      helperText={
                        touched.contact_number && errors.contact_number
                      }
                      error={Boolean(
                        errors.contact_number && touched.contact_number
                      )}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="file"
                      name="profile_image"
                      label="Profile image"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={(e) => setImage(e.target.files[0])}
                      // helperText={touched.profile_image && errors.profile_image}
                      // error={Boolean(errors.profile_image && touched.profile_image)}
                      sx={{ mb: 3 }}
                    />

                    <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        I have read and agree to the terms of service.
                      </Paragraph>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Regiser
                    </LoadingButton>

                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{
                          color: theme.palette.primary.main,
                          marginLeft: 5,
                        }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
