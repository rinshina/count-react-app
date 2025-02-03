import { ChakraProvider, Box, defaultSystem } from "@chakra-ui/react";
import { useState } from "react";
import UserForm from "./components/UserForm";
import Counter from "./components/Counter";
import RichTextEditor from "./components/RichTextEditor";
import Chart from "./components/Chart";
import Navbar from "./components/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ChakraProvider value={defaultSystem}>
      {!isLoggedIn ? (
        // If not logged in, show the login form
        <UserForm setIsLoggedIn={setIsLoggedIn} />
      ) : (
        // If logged in, show the dashboard layout
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gridTemplateRows="auto 1fr"
          height="100vh"
          gap="10px"
          padding="10px"
        >
          {/* NavBar Component - Top  */}
          <Box gridColumn="1 / span 2" gridRow="1">
            <Navbar />
          </Box>

          {/* Counter Component - Top Left */}
          <Box gridColumn="1" gridRow="2">
            <Counter />
          </Box>

          {/* Rich Text Editor - Top Right */}
          <Box gridColumn="2" gridRow="2">
            <RichTextEditor />
          </Box>

          {/* Chart Component - Bottom Full Width */}
          <Box gridColumn="1 / span 2" gridRow="3">
            <Chart />
          </Box>
        </Box>
      )}
    </ChakraProvider>
  );
}

export default App;
