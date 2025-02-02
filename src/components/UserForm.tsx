import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

interface User {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  password: string;
}

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
    login: "",
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Save form data before exiting the page
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes!";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [unsavedChanges]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setUnsavedChanges(true);
    validateField(name, value);
  };

  // Validate individual fields
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

  // Validate entire form
  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof typeof formData]);
      if (errors[key as keyof typeof errors]) {
        isValid = false;
      }
    });
    return isValid;
  };

  // Generate a unique user ID
  const generateUserId = () => `user_${Date.now()}`;

  // Save user data to local storage on sign-up
  const handleSignUp = () => {
    if (!validateForm()) {
      alert("Please fix errors before signing up.");
      return;
    }

    const existingUsers: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    // Check if the email or phone is already used
    const userExists = existingUsers.some(
      (user) => user.email === formData.email || user.phone === formData.phone
    );
    if (userExists) {
      alert("Email or phone number already registered!");
      return;
    }

    // Save new user
    const newUser: User = {
      id: generateUserId(),
      name: formData.name,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    alert("Signed up successfully!");
    setUnsavedChanges(false);
    setIsSignUp(false); // Redirect to Sign In
  };

  // Handle user login
  const handleSignIn = () => {
    const existingUsers: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const user = existingUsers.find(
      (u) => u.email === formData.email || u.phone === formData.phone
    );

    if (!user) {
      setErrors({ ...errors, login: "Not a registered user. Please sign up!" });
      return;
    }

    if (user.password !== formData.password) {
      setErrors({ ...errors, login: "Incorrect password!" });
      return;
    }

    alert("Signed in successfully!");
    setIsLoggedIn(true);
    setUnsavedChanges(false);
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
      {isSignUp ? (
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
            onClick={handleSignUp}
            fullWidth
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            onClick={() => setIsSignUp(false)}
            fullWidth
          >
            Sign In
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6">Sign In</Typography>
          <TextField
            label="Email or Phone"
            name="email"
            value={formData.email}
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
          <Typography color="error">{errors.login}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignIn}
            fullWidth
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            onClick={() => setIsSignUp(true)}
            fullWidth
          >
            Sign Up
          </Button>
        </>
      )}
    </Box>
  );
};

export default UserForm;
