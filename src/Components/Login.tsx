import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useValidation from "../Hooks/useValidation";


import { useNavigate } from "react-router-dom";
import { POST_LOGIN } from "../api/server";
import { postrequestMethod } from "../api/api";



const theme = createTheme();

export default function Login() {
  const { eventHandler } = useValidation();
  const navigate = useNavigate();

  const handleButton =()=>{
    navigate('/SignUp')
  }

  const [authorization, setAuthorization] = useState<any | null>(null);

  // SnackBar
  const [snackMessage, setSnackMessage] = useState<string>("");
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const handleOpenSnackBar = (message: string) => {
   try {
     setSnackMessage(message);
     setOpenSnackBar(true);
   } catch (error) {
     console.error("Error in handleOpenSnackBar:", error);
   }
 };

 const handleCloseSnackBar = () => {
  try {
    setOpenSnackBar(false);
  } catch (error) {
    console.error("Error in handleCloseSnackBar:", error);
  }
};


  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const validationHandler = async (e: any, alterName?: any) => {
    const val = e.target.value;
    const id = alterName;
    if (id) {
      let prom = new Promise((resolve) => {
        if (true) {
          resolve(eventHandler(id, val));
        }
      });
      prom.then((res) => setError({ ...error, [e.target.name]: res }));
    }
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  // const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    
    e.preventDefault();
    try {
      const result = postrequestMethod(POST_LOGIN, "", login);
      result.then((res: any) => {
        console.log("response is", res);

        if (res.data?.message) {
          handleOpenSnackBar(res.data?.message);
        } else {
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          sessionStorage.setItem("token", JSON.stringify(res.data.auth));
          setAuthorization(sessionStorage.getItem("token"));
          handleOpenSnackBar("User Logged Successfully...");
        }
      });
    } catch (error) {
      console.error("Error submitting login:", error);
    }
  };

  useEffect(()=>{
    if(authorization !== null){
      setTimeout(()=>{
     //   navigate("/dashboard");
     navigate("/addJob");
      },1000);
    }
  }, [authorization]);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        justifyContent="center"
        maxWidth="xl"
        sx={{ mt: { xs: "18%", sm: "14%", lg: "8%" }, mb: "3%" }}
      >
        <Grid
          container
          component={Paper}
          square
          elevation={20}
          justifyContent="center"
          sx={{
            height: "75%",
            width: "75%",
          }}
        >
          <CssBaseline />

          <Grid
            item
            xs={6}
            sm={6}
            md={5}
            lg={6}
            xl={6}
            sx={{ p: { xs: 0, sm: 2, md: 5 } }}
            component="img"
            src="https://ik.imagekit.io/nwssoft/NWS_Prerna_Project/LoginPageImage.png?updatedAt=1679649518016"
            alignItems="center"
          />

          <Grid item xs={12} sm={12} md={6} padding={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start ",
                justifyContent: "start",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ color: "#191970", fontWeight: "500" }}
                gutterBottom
              >
                Log in
              </Typography>
              <Typography sx={{ color: "#9e9e9e" }}>
                Welcome to prerna Academy
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  sx={{ background: "white" }}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={Boolean(error.email)}
                  helperText={error.email}
                  autoFocus
                  onChange={(e) => {
                    validationHandler(e, "email");
                  }}
                />

                <TextField
                  sx={{ background: "white" }}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={Boolean(error.password)}
                  helperText={error.password}
                  onChange={(e) => {
                    validationHandler(e, "password");
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, p: 2 }}
                  
                >
                  Login
                </Button>
                    
                 
      
      <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, p: 2 }}
                  onClick={handleButton}
                  
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>

    </ThemeProvider>
    
  );
}
