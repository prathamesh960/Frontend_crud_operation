import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Grid, TablePagination, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import React from "react";
import { deleteRequest, getRequest } from "../api/api";
import { UPDATE_DELETE_JOB, GET_JOB } from "../api/server";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Nav from "../Components/Nav";

interface User {
  _id: string;
  title: string;
  content: string;
  status: string;
}

export default function AddjobTable(props: any) {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const loadUsers = async () => {
    try {
      const res = await getRequest(GET_JOB, "");
      if (res) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const deleteData = async (id: any, title: any) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        deleteRequest(UPDATE_DELETE_JOB, id, "");
        loadUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>

      <Nav />

      <Container>



        <Paper
          elevation={20}
          sx={{
            displayP: "flex",
            justifyContent: "center",
            justifyItems: "center",
            p: 3,
            marginTop: 7

          }}
        >
          <Grid
            container
            sx={{
              p: 2,
              background: "#0288d1",
              color: "white",
            }}
          >
            <Grid>
              <Typography variant="h5" sx={{ mx: 3 }}>
                Manage Job
              </Typography>
            </Grid>
          </Grid>
          <TableContainer className="scrollBarCss">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                    }}
                  >
                    Sr.no
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                    }}
                  >
                    Job Title
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                    }}
                  >
                    Content
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user: any, index: any) => (
                    <React.Fragment key={user._id}>
                      <TableRow key={user.id}>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid #ddd",
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid #ddd",
                          }}
                        >
                          {user.title}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid #ddd",
                          }}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: user.content }}
                          ></div>
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid #ddd",
                          }}
                        >
                          {user.status}
                        </TableCell>

                        <TableCell
                          sx={{
                            textAlign: "center",
                            border: "1px solid #ddd",
                          }}
                        >
                          <Button variant="text">
                            <EditIcon
                              onClick={() =>
                                navigate("/EditJob", {
                                  state: {
                                    id: user._id,
                                    title: user.title,
                                    content: user.content,
                                    status: user.status,
                                    set: true,
                                  },
                                })
                              }
                            />
                          </Button>
                          <Button
                            variant="text"
                            onClick={() => deleteData(user._id, user.title)}
                          >
                            <DeleteIcon
                              sx={{ fontSize: "25px", color: "red" }}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </>
  );
}

