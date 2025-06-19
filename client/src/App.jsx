import "./App.css";
import { TextField, Button, colors, Stack } from "@mui/material";
import React, { useState } from "react";

function App() {
  const [loginMessage, setLoginMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const logIn = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@xecurify.com")) {
      setEmailError("Invalid Email ID");
      return;
    }

    const emailIdInput = document.getElementById("email-id");
    const passwordInput = document.getElementById("password-el");

    const emailId = emailIdInput.value;
    const password = passwordInput.value;

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId, password }),
      });

      const data = await res.json();
      console.log(data.message);

      emailIdInput.value = "";
      passwordInput.value = "";

      if (res.ok) {
        setLoginMessage("Logged in Successfully");
      } else {
        setLoginMessage(data.message);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const signUp = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@xecurify.com")) {
      setEmailError("Invalid Email ID");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId: email, password }),
      });

      const data = await res.json();
      console.log(data.message);

      if (res.status === 201) {
        setLoginMessage("Signed up successfully");
        setEmail("");
        setPassword("");
      } else if (res.status === 409) {
        setLoginMessage("User already exists");
      } else {
        setLoginMessage("Something went wrong");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setLoginMessage("Server error");
    }
  };

  return (
    <>
      <img
        className="company-logo"
        src="/miniorange-logo.webp"
        alt="miniOrange Logo"
      />

      <h1 id="welcome-header">
        Welcome to mini<span style={{ color: "#eb5424" }}>Orange</span>!
      </h1>

      {loginMessage && (
        <p
          style={{
            color:
              loginMessage === "Logged in Successfully" || loginMessage === "Signed up successfully" ? "green" : "red",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          {loginMessage}
        </p>
      )}

      <div id="login-box">
        <form onSubmit={logIn}>
          <div className="form-group">
            <TextField
              id="email-id"
              variant="standard"
              fullWidth
              placeholder="Enter your company Email ID"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              error={Boolean(emailError)}
              helperText={emailError}
            />
          </div>

          <div className="form-group">
            <TextField
              id="password-el"
              type="password"
              variant="standard"
              fullWidth
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ marginTop: "16px" }}>
            <Stack direction={"row"} spacing={1}>
              <Button
                onClick={logIn}
                variant="contained"
                sx={{
                  height: "40px",
                  width: "120px",
                  backgroundColor: "#eb5424",
                  fontWeight: "bold",
                  fontSize: "18px",
                  borderRadius: "5px",
                  "&:hover": {
                    backgroundColor: "#d14520",
                  },
                }}
              >
                Log In
              </Button>

              <Button
                onClick={signUp}
                variant="contained"
                sx={{
                  height: "40px",
                  width: "120px",
                  backgroundColor: "#eb5424",
                  fontWeight: "bold",
                  fontSize: "18px",
                  borderRadius: "5px",
                  "&:hover": {
                    backgroundColor: "#d14520",
                  },
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;