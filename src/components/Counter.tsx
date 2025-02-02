import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Button, Box, Typography } from "@mui/material";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(
    Number(localStorage.getItem("counter")) || 0
  );

  // Save count to localStorage on change
  useEffect(() => {
    localStorage.setItem("counter", count.toString());
  }, [count]);

  // Background animation based on count
  const bgColor = useSpring({
    backgroundColor: `rgba(100, 149, 237, ${Math.min(count / 10, 1)})`, // Light blue with opacity
    config: { tension: 150, friction: 20 },
  });

  return (
    <animated.div
      style={{
        ...bgColor,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{ padding: 4, background: "white", borderRadius: 2, boxShadow: 3 }}
      >
        <Typography variant="h4">Counter: {count}</Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCount(count + 1)}
            sx={{ marginRight: 1 }}
          >
            +
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setCount(count - 1)}
            sx={{ marginRight: 1 }}
          >
            -
          </Button>
          <Button variant="contained" color="error" onClick={() => setCount(0)}>
            Reset
          </Button>
        </Box>
      </Box>
    </animated.div>
  );
};

export default Counter;
