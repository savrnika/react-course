import React from "react";
import {
  Box,
  Icon,
  Button,
  Fab,
  styled,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { SimpleCard } from "app/components";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { toast } from "react-toastify";
import { getexamList } from "app/apis/apiMethods";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export default function ExamList() {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [userID, setUserID] = useState("");

  function handleClickOpen(id) {
    setOpen(true);
    setUserID(id);
  }
  function handleClose() {
    setOpen(false);
  }

  const examList = async () => {
    const users = await getexamList();
    console.log('users.data.data',users.data);
    setState(users.data);
  };
  useEffect(() => {
    examList();
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Container>
      <Box width="100%" overflow="auto">
        <SimpleCard>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{fontSize:"20px"}}>Exam</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {state && state */}
              {state && Array.isArray(state) && state.length > 0 && state
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  console.log('item, index',item, index);
                  return (
                  <TableRow key={index}>
                     {/* <TableCell align="center"><Link to={'/questionlist'}>try</Link></TableCell>  */}
                    <TableCell align="left"><Link to={`/getexam/${item._id}`}>
                      <StyledButton variant="contained" color="primary" onClick={()=>{localStorage.setItem('id', item._id);}}  >
                    {item.title}
                      </StyledButton>
                      </Link>
                      </TableCell>
                  </TableRow>
                  )
                })}

              <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              ><DialogActions>
              <Button onClick={handleClose} color="primary">
                <h6>No</h6>
              </Button>
              
            </DialogActions>
              </Dialog>
            </TableBody>
          </StyledTable>
         </SimpleCard>
         <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={state.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
        </Box>
    </Container>
  );
}