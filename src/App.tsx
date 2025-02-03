import { ChakraProvider, Box, Button, defaultSystem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import Counter from "./components/Counter";
import RichTextEditor from "./components/RichTextEditor";
// import Chart from "./components/Chart";
import Navbar from "./components/NavBar"; // Correctly import Navbar

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const email = localStorage.getItem("email"); // Retrieve the stored email
    if (isLoggedIn && users.length && email) {
      const currentUser = users.find(
        (user: { email: string }) => user.email === email
      ); // Find user by email
      if (currentUser) {
        setUserName(currentUser.name); // Set userName if found
      }
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName(""); // Clear userName on logout
    localStorage.removeItem("email"); // Remove the email from localStorage
  };

  return (
    <ChakraProvider value={defaultSystem}>
      {!isLoggedIn ? (
        <UserForm setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gridTemplateRows="auto 1fr"
          height="100vh"
          gap="10px"
          padding="10px"
        >
          {/* Navbar with userName */}
          <Box
            gridColumn="1 / span 2"
            gridRow="1"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Navbar userName={userName} /> {/* Pass userName to Navbar */}
            <Button colorScheme="red" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </Box>

          <Box gridColumn="1" gridRow="2">
            <Counter />
          </Box>

          <Box gridColumn="2" gridRow="2">
            <RichTextEditor />
          </Box>
        </Box>
      )}
    </ChakraProvider>
  );
}

export default App;
