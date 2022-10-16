import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendAuthRequest } from "../../helpers/api-helpers";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
const labelSx = { marginRight: "auto", mt: 1, mb: 1 };
const Form = () => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const onClose = () => {
    setOpen(false);
    navigate("/");
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onRequestSent = (val) => {
    localStorage.setItem("userId", val.id);
    dispatch(userActions.login());
    setOpen(false);
    navigate("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    setInputs({ name: "", email: "", password: "" });

    if (isSignup) {
      sendAuthRequest(inputs, true)
        .then(onRequestSent)
        .catch((err) => console.log(err));
    } else {
      sendAuthRequest({ email: inputs.email, password: inputs.password })
        .then(onRequestSent)
        .catch((err) => console.log(err));
    }
  };

  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={open}>
      <Box sx={{ marginLeft: "auto", padding: 1 }}>
        <IconButton onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {isSignup ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          alignItems={"center"}
          width={400}
          padding={6}
          margin="auto"
          display="flex"
          flexDirection={"column"}
        >
          {isSignup && (
            <>
              <FormLabel sx={labelSx}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                name="name"
                variant="standard"
                fullWidth
                margin="normal"
                placeholder="name"
              />
            </>
          )}
          <FormLabel sx={labelSx}>Email</FormLabel>
          <TextField
            onChange={handleChange}
            value={inputs.email}
            name="email"
            type="email"
            variant="standard"
            fullWidth
            margin="normal"
            placeholder="Email"
          />
          <FormLabel sx={labelSx}>Password</FormLabel>
          <TextField
            onChange={handleChange}
            value={inputs.password}
            name="password"
            type={"password"}
            variant="standard"
            fullWidth
            margin="normal"
            placeholder="Password"
          />
          <Button
            sx={{ borderRadius: 10, mt: 2, bgcolor: "#2b2d42" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button
            sx={{ borderRadius: 10, mt: 2 }}
            onClick={() => setIsSignup(!isSignup)}
            fullWidth
          >
            Switch To {`${isSignup ? "Login" : "Signup"}`}
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

export default Form;
