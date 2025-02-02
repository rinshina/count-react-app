import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

interface UserFormProps {
  setIsLoggedIn: (status: boolean) => void;
}

const UserForm: React.FC<UserFormProps> = ({ setIsLoggedIn }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        error =
          value.trim().length < 3 ? "Name must be at least 3 characters" : "";
        break;
      case "email":
        error = /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email format";
        break;
      case "address":
        error =
          value.trim().length < 5
            ? "Address must be at least 5 characters"
            : "";
        break;
      case "phone":
        error = /^[0-9]{10}$/.test(value) ? "" : "Phone must be 10 digits";
        break;
      case "password":
        error =
          value.length < 6 ? "Password must be at least 6 characters" : "";
        break;
      case "confirmPassword":
        error = value !== formData.password ? "Passwords do not match" : "";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      validateField(key, value);
      if (errors[key as keyof typeof errors]) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) {
      alert("Please fix errors before saving.");
      return;
    }

    setIsLoggedIn(true);
    alert(isSignUp ? "Signed Up!" : "Signed In!");

    // Clear form after submission
    setFormData({
      name: "",
      address: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
    setFormData({
      name: "",
      address: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
    setFormData({
      name: "",
      address: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Toggle between SignIn and SignUp */}
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
            onClick={handleSave}
            fullWidth
          >
            Sign In
          </Button>
          <Box sx={{ textAlign: "center", marginTop: "10px" }}>
            <Typography variant="body2">OR</Typography>
          </Box>
          <Button variant="outlined" onClick={handleSignUpClick} fullWidth>
            Sign Up
          </Button>
        </>
      ) : (
        // Sign Up Form
        <>
          <Typography variant="h6">Sign Up</Typography>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
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
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            fullWidth
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
          >
            Sign Up
          </Button>
          <Box sx={{ textAlign: "center", marginTop: "10px" }}>
            <Typography variant="body2">OR</Typography>
          </Box>
          <Button variant="outlined" onClick={handleSignInClick} fullWidth>
            Sign In
          </Button>
        </>
      )}

      {/* Google Sign-In */}
      <Button variant="contained" fullWidth sx={{ marginTop: "10px" }}>
        {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
      </Button>
    </Box>
  );
};

export default UserForm;
