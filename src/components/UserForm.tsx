import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface User {
  name: string;
  address: string;
  email: string;
  phone: string;
  password: string;
}

interface GoogleTokenPayload {
  email: string;
  name?: string;
  picture?: string;
}

interface UserFormProps {
  setIsLoggedIn: (status: boolean) => void;
}

const UserForm: React.FC<UserFormProps> = ({ setIsLoggedIn }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<{
    name: string;
    address: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }>({
    name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    name: string;
    address: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    signIn: string;
  }>({
    name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    signIn: "",
  });

  useEffect(() => {
    const storedUsers: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    setUsers(storedUsers);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignIn = () => {
    const { email, phone, password } = formData;
    const existingUser = users.find(
      (user) => user.email === email || user.phone === phone
    );

    if (!existingUser) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Not a registered user",
      }));
      return;
    }

    if (existingUser.password !== password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Incorrect password",
      }));
      return;
    }

    localStorage.setItem("email", existingUser.email); // Store email on sign-in
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    const newUser: User = {
      name: formData.name,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Sign-up successful!");
    setIsSignUp(false);
  };

  const handleGoogleSuccess = (response: CredentialResponse) => {
    if (!response.credential) {
      alert("Google authentication failed!");
      return;
    }

    try {
      // Decode JWT token with explicit type
      const decodedToken: GoogleTokenPayload = jwtDecode<GoogleTokenPayload>(
        response.credential
      );

      if (!decodedToken.email) {
        alert("Failed to retrieve email from Google login.");
        return;
      }

      const googleEmail = decodedToken.email;
      const existingUser = users.find((user) => user.email === googleEmail);

      if (existingUser) {
        localStorage.setItem("email", existingUser.email);
        setIsLoggedIn(true);
      } else {
        alert("No account found. Please sign up first.");
        setIsSignUp(true);
      }
    } catch (error) {
      console.error("Error decoding Google JWT:", error);
      alert("Authentication error. Please try again.");
    }
  };

  const handleGoogleError = () => {
    alert("Google Login Failed!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "400px",
          margin: "auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {!isSignUp ? (
          <>
            <Typography variant="h6">Sign In</Typography>
            <TextField
              label="Email or Phone"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignIn}
              fullWidth
            >
              Sign In
            </Button>
            <Typography variant="body2" align="center">
              OR
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </Box>
            <Button
              variant="outlined"
              onClick={() => setIsSignUp(true)}
              fullWidth
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">Sign Up</Typography>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignUp}
              fullWidth
            >
              Sign Up
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => setIsSignUp(false)}
              fullWidth
            >
              Back to Sign In
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserForm;
