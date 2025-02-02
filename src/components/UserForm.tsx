import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [isDirty, setIsDirty] = useState(false); // Track unsaved changes

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value); // Validate field on change
    setIsDirty(true);
  };

  // Validate a single field
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
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // Validate entire form before saving
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

  // Save multiple user entries to localStorage
  const handleSave = () => {
    if (!validateForm()) {
      alert("Please fix errors before saving.");
      return;
    }

    const savedData = localStorage.getItem("userData");
    let parsedData = [];

    try {
      parsedData = savedData ? JSON.parse(savedData) : [];
      if (!Array.isArray(parsedData)) {
        parsedData = []; // Reset if data is not an array
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      parsedData = []; // Reset in case of an error
    }

    // Create new user entry with a unique ID
    const newUserData = { id: uuidv4(), ...formData };

    // Append new user entry
    parsedData.push(newUserData);

    // Save updated list back to localStorage
    localStorage.setItem("userData", JSON.stringify(parsedData));

    setIsDirty(false);
    alert("User Data Saved!");

    // Reset form after saving
    setFormData({ name: "", address: "", email: "", phone: "" });
  };

  // Reset form
  const handleReset = () => {
    setFormData({ name: "", address: "", email: "", phone: "" });
    setErrors({ name: "", address: "", email: "", phone: "" });
    setIsDirty(false);
  };

  // Prevent leaving the page if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

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
      <Typography variant="h6">User Information</Typography>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        error={!!errors.address}
        helperText={errors.address}
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone}
        fullWidth
      />

      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          fullWidth
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          fullWidth
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;
