import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

const Counter = () => {
  const [count, setCount] = useState(0);

  // Background color effect: The higher the count, the darker the blue
  const backgroundSpring = useSpring({
    backgroundColor: `rgba(100, 100, 255, ${Math.min(count / 10, 1)})`,
    config: { tension: 200, friction: 20 },
  });

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => Math.max(0, prev - 1)); // Prevent going below 0
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <animated.div
      style={{
        ...backgroundSpring,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "300px", // Increased height
        width: "100%", // Slightly wider for better layout
        borderRadius: "10px",
        padding: "30px", // Increased padding for spacing
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Counter: {count}
      </Typography>
      <Box display="flex" gap="15px" justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleIncrement}>
          +
        </Button>
        <Button variant="contained" color="error" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDecrement}>
          -
        </Button>
      </Box>
    </animated.div>
  );
};

export default Counter;
