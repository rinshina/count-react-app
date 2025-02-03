import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";

interface User {
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
  const [users, setUsers] = useState<User[]>([]); // Stores signed-up users
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
    signIn: "",
  });

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

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
        error =
          value.trim() === ""
            ? "Email is required"
            : /\S+@\S+\.\S+/.test(value)
            ? ""
            : "Invalid email format";
        break;
      case "address":
        error =
          value.trim().length < 5
            ? "Address must be at least 5 characters"
            : "";
        break;
      case "phone":
        error =
          value.trim() === ""
            ? "Phone number is required"
            : /^[0-9]{10}$/.test(value)
            ? ""
            : "Phone must be 10 digits";
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

  const handleSignUp = () => {
    if (Object.values(errors).some((err) => err !== "")) {
      alert("Please fix errors before submitting.");
      return;
    }

    const { name, address, email, phone, password } = formData;

    // Check if email or phone is already used
    if (users.some((user) => user.email === email || user.phone === phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "This email or phone number is already registered",
      }));
      return;
    }

    const newUser: User = { name, address, email, phone, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers); // Store user data

    // Save updated users to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Sign-up successful! You can now sign in.");
    setIsSignUp(false);
    setFormData({
      name: "",
      address: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({
      name: "",
      address: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      signIn: "",
    });
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

    setIsLoggedIn(true);
    alert("Signed in successfully!");

    setFormData({
      name: "",
      address: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    setErrors({
      name: "",
      address: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      signIn: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px",
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6">{isSignUp ? "Sign Up" : "Sign In"}</Typography>

      {!isSignUp ? (
        <>
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

          {/* Google Sign-In Centered */}
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <GoogleLogin
              onSuccess={() => setIsLoggedIn(true)}
              onError={() => console.log("Login Failed")}
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
        </>
      )}
    </Box>
  );
};

export default UserForm;
