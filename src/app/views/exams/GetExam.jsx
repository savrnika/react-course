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
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { toast } from "react-toastify";
import { getexam, postanswer } from "app/apis/apiMethods";


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

export default function GetExam() {

    const [state, setState] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [answers, setAnswers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [userID, setUserID] = useState("");

    const navigate = useNavigate()


    const { id } = useParams()

    function handleClickOpen(id) {
        setOpen(true);
        setUserID(id);
    }
    function handleClose() {
        setOpen(false);
    }
    const getExam = async () => {
        console.log("sdfs", id)
        const data = {
            id
        }
        await getexam(id, data).then((res) => {
            setState(res);
        }).catch((err) => {
            console.log("err", err)
        })
    }

    const PostData = async () => {
        console.log("hkukl", state);
        var examId = await localStorage.getItem('id');
        var userId = await localStorage.getItem('_id');

        // console.log(examId,userId)

        const users = await postanswer("/user/addAnswer")
        console.log("users", users);
        navigate("/user/addAnswer")

    }


    useEffect(() => {
        getExam();
    }, []);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    // const handleChange = (e, key) => {
    //     let changearray = [...options];
    //     changearray[key].isCorrect = e.target.value == "true" ? true : false;
    //     setOptions(changearray);
    //   };

    // const textChange = (e, key) => {
    //     let changearray = [...options];
    //     changearray[key].text = e.target.value;
    //     setOptions(changearray);
    //   };
    

    const handleChange = (props) => {
        // setState(...useState);
        var Arr = [...answers];
        console.log(props)
        var obj = {
            questionId: props.item._id,
            answerId: props.itm._id
        }
        console.log(obj)
        Arr.push(obj)
        console.log('this is value', Arr)

        setAnswers(Arr)
    }

    return (
        <Container>
            <Box width="100%" overflow="auto">
                <SimpleCard>
                    <StyledTable>
                        <TableBody>
                            {state && Array.isArray(state) && state.length > 0 && state
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => {
                                    return (<TableRow key={index}>
                                        <TableCell>
                                            <TableCell>
                                                {item?.question.map((item, ind) => {
                                                    console.log('item, question', item);
                                                    return (
                                                        <React.Fragment>
                                                            <p1 key={item._id} >
                                                                <h2>
                                                                    {ind + 1}
                                                                    {item.title}
                                                                </h2>
                                                              
                                                                {item.questionType == 'Radio' && item?.options.map((itm, mykey) => {
                                                                    return (
                                                                        <>
                                                                            <TableRow key={mykey}><TableCell  ><input class="form-check-input mt-0" type="radio" value="" aria-label="Radio button for following text input" name={`text${index}`} onChange={(e) => handleChange({ item, itm })} onClick={console.log("kkkkkkkk")}></input> {itm.text}</TableCell></TableRow>
                                                                        </>
                                                                    )
                                                                })}
                                                                {item.questionType == 'Checkbox' && item?.options.map((itm, mykey) => {
                                                                    return (
                                                                        <>
                                                                            <TableRow key={mykey}><TableCell ><input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" onChange={(e) => handleChange({ item, itm })} onClick={console.log("jkjkvfhdk")}></input> {itm.text}</TableCell></TableRow>
                                                                        </>
                                                                    )
                                                                })}
                                                                {item.questionType == 'True/false' && item?.options.map((itm, mykey) => {
                                                                    return (
                                                                        <>
                                                                            <TableRow key={mykey}><TableCell  ><input class="form-check-input mt-0" type="radio" value="" aria-label="Radio button for following text input" name={`text${index}`} onChange={(e) => handleChange({ item, itm })} onClick={console.log("jkjkvfhdk")}></input> {itm.text}</TableCell></TableRow>
                                                                        </>
                                                                    )
                                                                })}
                                                            </p1>
                                                            </React.Fragment>
                                                      );
                                                })}
                                            </TableCell>

                                        </TableCell>

                                    </TableRow>)

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
                    rowsPerPageOptions={[1, 5]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{ "aria-label": "Next Page" }}
                    backIconButtonProps={{ "aria-label": "Previous Page" }}
                />
                <TableCell align="center">
                    <StyledButton variant="contained" onClick={(e) => { PostData(e) }} color="primary" >
                        submit
                    </StyledButton>
                </TableCell>
            </Box>
        </Container>
    );
}