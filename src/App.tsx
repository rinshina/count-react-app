import { ChakraProvider, Box } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react";
import { useState } from "react";
import Auth from "./components/Auth";
import Counter from "./components/Counter";
import RichTextEditor from "./components/RichTextEditor";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ChakraProvider value={defaultSystem}>
      {!isLoggedIn ? (
        <Auth setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gridTemplateRows="auto 1fr"
          height="100vh"
          gap="10px"
          padding="10px"
        >
          <Box gridColumn="1" gridRow="1">
            <Counter />
          </Box>
          <Box gridColumn="2" gridRow="1">
            <RichTextEditor />
          </Box>
        </Box>
      )}
    </ChakraProvider>
  );
}

export default App;
