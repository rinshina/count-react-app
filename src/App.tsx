// src/App.tsx

import { ChakraProvider, Box } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react";
import { useState } from "react";
import Auth from "./components/Auth"; // Import Auth component
import UserForm from "./components/UserForm"; // Import UserForm
import Counter from "./components/Counter"; // Import Counter
import RichTextEditor from "./components/RichTextEditor"; // Import RichTextEditor

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ChakraProvider value={defaultSystem}>
      {!isLoggedIn ? (
        // Display the Auth component when not logged in
        <Auth setIsLoggedIn={setIsLoggedIn} />
      ) : (
        // Display main content when logged in
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gridTemplateRows="auto 1fr"
          height="100vh"
          gap="10px"
          padding="10px"
        >
          {/* Counter (Top Left) */}
          <Box gridColumn="1" gridRow="1">
            <Counter />
          </Box>

          {/* Rich Text Editor (Top Right) */}
          <Box gridColumn="2" gridRow="1">
            <RichTextEditor />
          </Box>

          {/* UserForm (Bottom, spanning both columns) */}
          <Box gridColumn="1 / span 2" gridRow="2">
            <UserForm isSignUp={false} setIsLoggedIn={setIsLoggedIn} />
          </Box>
        </Box>
      )}
    </ChakraProvider>
  );
}

export default App;
