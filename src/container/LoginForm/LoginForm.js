import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { API_ADMIN_LOGIN, URL } from "~/api";
import { fetchData, handleClickVariant } from "~/common";
import { ACCESS_TOKEN } from "~/constants";
import { SnackbarProvider, useSnackbar } from "notistack";
const FormWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#f2f2f2",
  padding: "48px",
  borderRadius: "8px",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
});

const LoginTextField = styled(TextField)({
  marginBottom: "16px",
  width: "100%",

  "& .MuiInputBase-input": {
    color: "#333",
  },

  "& label.Mui-focused": {
    color: "#2196f3",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#2196f3",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2196f3",
    },
  },
});

const LoginButton = styled(Button)({
  width: "100%",
  marginTop: "16px",
  backgroundColor: "#2196f3",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#0d8bf2",
  },
});

function Login({ setIsLogin }) {
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(API_ADMIN_LOGIN, { username, password }, "POST").then((res) => {
      handleClickVariant(res.status === 200 ? "success" : "error", res.messenger, enqueueSnackbar);
      if (res.status === 200) {
        fetch(`${URL}/token/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem(ACCESS_TOKEN, JSON.stringify(data.access));
            setIsLogin(true);
          });
      }
    });
  };

  return (
    <FormWrapper style={{ height: "85vh" }}>
      <form onSubmit={handleSubmit}>
        <LoginTextField label="Username" variant="outlined" value={username} onChange={handleUsernameChange} />
        <LoginTextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
        />
        <LoginButton variant="contained" type="submit">
          Login
        </LoginButton>
      </form>
    </FormWrapper>
  );
}

export default Login;
