import { useEffect } from "react";
import Box from "@mui/material/Box";
import {
  TextField,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Button,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";
import JoditEditor from "jodit-react";
import { useLocation, useNavigate } from "react-router-dom";
import useValidation from "../Hooks/useValidation";
import LinearProgress from "@mui/material/LinearProgress";
import { postrequestMethod, updateRequest } from "../api/api";
import { POST_JOB, UPDATE_DELETE_JOB } from "../api/server";
import axios from "axios";
import Nav from "../Components/Nav";


interface Job {
  title: string;
  content: string;
  status: string;
}

export default function AddJobForm(props: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventHandler } = useValidation();
  const isEditRoute = location.pathname === "/EditJob";
  
  const [errors, setErrors] = useState({
    title: "",
  });

  const [job, setJob] = useState<Job>({
    title: "",
    content: "",
    status: "",
  });


  //for progress bar
  const [isLoading, setLoading] = useState(false);

 

  const updateValue = (e: any) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const ValidationHandler = async (e: any, alterName?: any) => {
    try {
      const val = e.target.value;
      const id = alterName;
      if (id) {
        const res = await eventHandler(id, val);
        setErrors({ ...errors, [e.target.name]: res });
      }
    } catch (error) {
      console.error("Error in ValidationHandler:", error);
    }
  };


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (validator()) {
      try {
        setLoading(true);
        if (location.state === null) {
          const response = await axios.post(
            "http://localhost:5000/job/add-job",
            job,
            {
              headers: {
                "Content-Type": "application/json", //  content 
              },
            }
          );
          console.log("job", job);
          if (response) {
           
            window.scrollTo(0, 0);
            setTimeout(() => {
              navigate("/ManageJob");
            }, 3000);
          }
        } else {
          let id = location.state?.id;
          await updateRequest(UPDATE_DELETE_JOB, id, job, "");
          setTimeout(() => {
            navigate("/ManageJob");
          }, 3000);
        }
      } catch (error) {
        console.error("Error submitting job:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  
  const validator = () => {
    for (let field in errors) {
      if (errors[field as keyof typeof errors] !== "") {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (location?.state) {
      setJob(location.state);
    }
  }, [location]);
  console.log("location",location);

  useEffect(() => {
    if (!isEditRoute) {
      setJob({
        title: "",
        content: "",
        status: "",
      });
    } else {
      setJob({
        title: location.state.title,
        content: location.state.content,
        status: location.state.status,
      });
    }
  }, [isEditRoute, location]);

  useEffect(() => {
    if (!isEditRoute) {
      setJob({
        title: "",
        content: "",
        status: "",
      });
    } else {
      setJob({
        title: location.state.title,
        content: location.state.content,
        status: location.state.status,
      });
    }
  }, [isEditRoute, location]);

  return (
    
    <>

    <Nav/>
      <Container>
        <Paper elevation={20} sx={{ p: 3 }}>
          <Box sx={{ p: "10px" }} component="form" onSubmit={handleSubmit}>
            {isLoading && <LinearProgress />}
            <Container maxWidth="md">
              <Typography
                variant="h6"
                align="center"
                sx={{ m: "10px", color: "#0288d1" }}
              >
                {location?.state?.set ? <>Edit Job</> : <>Add Job</>}
              </Typography>

              <Grid>
                <Grid xs={12} md={12} item>
                  <TextField
                    id="filled-read-only-input"
                    label="Job Title"
                    fullWidth
                    required
                    value={job.title}
                    variant="outlined"
                    name="title"
                    error={Boolean(errors.title)}
                    helperText={errors.title}
                    onChange={updateValue}
                    onBlur={(e) => ValidationHandler(e, "alphabetsAndSpace")}
                    sx={{ background: "white" }}
                    autoComplete="false"
                  />
                </Grid>

                <Grid item md={12} style={{ textAlign: "left" }}>
                  <Typography textAlign="left" sx={{ padding: 1 }}>
                    JOB Content:
                  </Typography>
                  <JoditEditor
                    value={job.content}
                    onChange={(content: string) =>
                      setJob({ ...job, content: content })
                    }
                  />
                </Grid>

                <Grid item md={12}>
                  <FormControl sx={{ minWidth: 120, mt: 3 }} fullWidth required>
                    <InputLabel id="demo-simple-select-label">
                      Job Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      label="Job Status"
                      required
                      id="demo-simple-select"
                      value={job.status}
                      name="status"
                      sx={{ textAlign: "start" }}
                      onChange={(e) =>
                        setJob({ ...job, status: e.target.value })
                      }
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
