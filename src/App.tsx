import { ChakraProvider, Box } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react";
import Counter from "./components/Counter";
import UserForm from "./components/UserForm";
import RichTextEditor from "./components/RichTextEditor";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
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
          <UserForm />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
