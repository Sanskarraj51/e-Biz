// ** React Imports

import { useState } from "react";
import axios from "axios";

// 88 firebase imports
import { storage } from "../../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";


// ** MUI Components
import ChevronLeft from "mdi-material-ui/ChevronLeft";
import MuiLink from "@mui/material/Link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";

// ** Icons Imports

import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import LoginIcon from "mdi-material-ui/Login";

// ** Third Party Imports

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { toast } from "react-toastify";

// ** Demo Imports

import FooterIllustrationsV2 from "../../components/FooterIllustrationsV2";
import { Link } from "react-router-dom";

const defaultValues = {
  first_name: "",
  last_name: "",
  confirm_password: "",
  email: "",
  password: "",
};

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
}));
const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

// ** Styled Components

const RegisterIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const RegisterIllustration = styled("img")(({ theme }) => ({
  maxWidth: "48rem",
  [theme.breakpoints.down("xl")]: {
    maxWidth: "38rem",
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "30rem",
  },
}));

const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 600,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 600,
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: "0.18px",
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) },
}));


const Register = () => {
  // ** states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formStep, setFormsStep] = useState(0);
  const [defImg, setDefImg] = useState("");
  const [image, setImage] = useState("");
  const [imageErr, setImageErr] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // ** hooks
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  const schema = yup.object().shape({
    password: yup.string().min(8).required(),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),

    first_name: yup
      .string()
      .required("First name required")
      .matches(/^[a-zA-Z]+$/, "First name only letters"),
    last_name: yup.string().required("Last name required"),
    email: yup.string().email().required(),
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  function previewFile(file, type) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDefImg(reader.result);
    };
  }

  const onImgChange = (e, type) => {
    const image = e.target.files[0];
    if (!image) {
      toast.error("Image is required");
      return false;
    }
    if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      toast.error("Sselect a valid image.");
      return false;
    } else {
      setImage(image);
      previewFile(image, type);
    }
  };

  const imageSource = "auth-v2-register-illustration-bordered";
  //    : 'auth-v2-register-illustration'

  const uploadImg = async (img) => {
    const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${img.name}`);
    try {
      const snap = await uploadBytes(imgRef, img);
      const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
      if (url) {
        return url;
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong on our side!");
    }
  };

  const onSubmit = async (data) => {
    if (!defImg) {
      setImageErr(true);

      return false;
    }

    try {
      setImageErr(false);
      setShowButton(true)
      let imageUrl = await uploadImg(image);

      const apiData = {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        password: data.password,
        profilePic: imageUrl,
      };

      const response = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/user/signup/`,
        apiData,
        {
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.data) {
        toast.success("Registered Successfully!");
        setFormsStep(2);
              setShowButton(false)

      }
    } catch (err) {
      toast.error("Something went wrong on our side!");
      setShowButton(false)

    }
  };

  return (
    <Box
      className="content-right"
      sx={{ display: "flex", alignItems: "start", justifyContent: "center" }}
    >
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RegisterIllustrationWrapper>
            <RegisterIllustration
              alt="register-illustration"
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </RegisterIllustrationWrapper>
          <FooterIllustrationsV2
            image={`/images/pages/auth-v2-register-mask-${theme.palette.mode}.png`}
          />
        </Box>
      ) : null}
      <RightWrapper sx={{ borderLeft: `1px solid ${theme.palette.divider}` }}>
        <Box
          sx={{
            p: 7,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: "flex",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width={47}
                fill="none"
                height={26}
                viewBox="0 0 268 150"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fill={theme.palette.primary.main}
                  transform="matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fillOpacity="0.4"
                  fill="url(#paint0_linear_7821_79167)"
                  transform="matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fill={theme.palette.primary.main}
                  transform="matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fill={theme.palette.primary.main}
                  transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fillOpacity="0.4"
                  fill="url(#paint1_linear_7821_79167)"
                  transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
                />
                <rect
                  rx="25.1443"
                  width="50.2886"
                  height="143.953"
                  fill={theme.palette.primary.main}
                  transform="matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)"
                />
                <defs>
                  <linearGradient
                    y1="0"
                    x1="25.1443"
                    x2="25.1443"
                    y2="143.953"
                    id="paint0_linear_7821_79167"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop />
                    <stop offset="1" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    y1="0"
                    x1="25.1443"
                    x2="25.1443"
                    y2="143.953"
                    id="paint1_linear_7821_79167"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop />
                    <stop offset="1" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <Typography
                variant="h6"
                sx={{
                  ml: 2,
                  lineHeight: 1,
                  fontWeight: 700,
                  fontSize: "1.5rem !important",
                }}
              >
                React Developer
              </Typography>
            </Box>
            {formStep === 0 && (

            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box sx={{ mb: 6 }}>
                <TypographyStyled variant="h5">
                  Adventure starts here 🚀
                </TypographyStyled>
              </Box>

              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{ p: 2, mb: 2 }}
              >
                <ImgStyled
                  src={defImg || "/images/avatars/1.png"}
                  alt="Profile Pic"
                />
                <Box>
                  <ButtonStyled
                    component="label"
                    variant="contained"
                    htmlFor="portal-picture"
                  >
                    Upload Pic
                    <input
                      hidden
                      type="file"
                      // name='profile_photo'
                      onChange={(e) => onImgChange(e, 1)}
                      accept="image/png, image/jpeg"
                      id="portal-picture"
                    />
                  </ButtonStyled>
                </Box>
              </Grid>
              {imageErr && (
                <FormHelperText sx={{ color: "error.main" }}>
                  A valid Image is required
                </FormHelperText>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name="first_name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        value={value}
                        onBlur={onBlur}
                        label="First Name"
                        onChange={onChange}
                        error={Boolean(errors.first_name)}
                      />
                    )}
                  />
                  {errors.first_name && (
                    <FormHelperText sx={{ color: "error.main" }}>
                      {errors.first_name.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth sx={{ mb: 4, mx: 4 }}>
                  <Controller
                    name="last_name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        value={value}
                        onBlur={onBlur}
                        label="Last Name"
                        onChange={onChange}
                        error={Boolean(errors.last_name)}
                      />
                    )}
                  />
                  {errors.last_name && (
                    <FormHelperText sx={{ color: "error.main" }}>
                      {errors.last_name.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      value={value}
                      label="Email"
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel
                  htmlFor="auth-login-v2-password"
                  error={Boolean(errors.password)}
                >
                  Password
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      label="Password"
                      onBlur={onBlur}
                      onChange={onChange}
                      id="auth-login-v2-password"
                      error={Boolean(errors.password)}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel
                  htmlFor="auth-login-v2-password"
                  error={Boolean(errors.password)}
                >
                  Confirm Password
                </InputLabel>
                <Controller
                  name="confirm_password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      label="Confirm Password"
                      onBlur={onBlur}
                      onChange={onChange}
                      id="auth-login-v2-password"
                      error={Boolean(errors.confirm_password)}
                      type={showConfirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOutline />
                            ) : (
                              <EyeOffOutline />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.confirm_password && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.confirm_password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <LoadingButton
                loadingPosition="start"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={showButton}
                sx={{ mb: 7 }}
                startIcon={<LoginIcon />}
              >
                 Sign up
              </LoadingButton>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ mr: 2, color: "text.secondary" }}>
                  Already have an account?
                </Typography>
                <Typography>
                  <Link to="/login">
                    <Typography
                      component={MuiLink}
                      sx={{ color: "primary.main" }}
                    >
                      Sign in instead
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </form>
            )}
            {formStep === 2 && (
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ mb: 6 }}>
                  <TypographyStyled variant="h5">
                    Congratulations!!
                  </TypographyStyled>
                  <Typography variant="body2">
                    Thanks for registring with us.. You may login now
                  </Typography>
                </Box>
                <Link to="/login">
                  <Typography
                    component={MuiLink}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "primary.main",
                      justifyContent: "center",
                    }}
                  >
                    <ChevronLeft sx={{ mr: 1.5, fontSize: "2rem" }} />
                    <span>Back to login</span>
                  </Typography>
                </Link>
              </Typography>
            )}
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};

export default Register;
