// ** React Imports
import { useState, useEffect } from "react";

// ** Next Import
import { Link, useNavigate } from "react-router-dom";

// ** MUI Imports
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(12, 6, 6),
  borderRadius: theme.shape.borderRadius,
}));

const Profile = () => {
  // ** State
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const theme = useTheme();
  const navigate = useNavigate();

  //   ** redux states
  const store = useSelector((state) => state.user);

  // ** hooks

  useEffect(() => {
    if (store?.data) {
      setData(store?.data);
    }
  }, [store]);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  if (data) {
    return (
      <BoxWrapper

      >
        {" "}
        <Box
          sx={{
            top: 30,
            left: 40,
            display: "flex",
            position: "absolute",
            alignItems: "center",
            justifyContent: "space-between",
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
        <Grid container spacing={6} sx={{width:"100%", display:"flex" , justifyContent:"center"}}  >
          <Grid item xs={12} md={6}  >
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <CardContent
                    sx={{
                      pt: 15,
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ p: 2, mb: 2 }}
                    >
                      <ImgStyled
                        src={data.profilePic || "/images/avatars/1.png"}
                        alt="Profile Pic"
                      />
                    </Grid>
                    <Typography
                      variant="h6"
                      sx={{ mb: 4, textAlign: "center" }}
                    >
                      {data?.firstName + " " + data?.lastName}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="h6">Details</Typography>
                    <Divider sx={{ mt: 4 }} />
                    <Box sx={{ pt: 2, pb: 1 }}>
                      <Box sx={{ display: "flex", mb: 2.7 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ width: 120, mr: 2, color: "text.primary" }}
                        >
                          Email:
                        </Typography>
                        <Typography variant="body2">{data?.email}</Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ mt: 4 }} />
                    <Button
                      onClick={logout}
                      fullWidth
                      color="error"
                      variant="outlined"
                    >
                      Logout
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </BoxWrapper>
    );
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity="error">
            User with the id: does not exist. Please check the list of users:{" "}
            <Link href="/apps/user/list">User List</Link>
          </Alert>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default Profile;
