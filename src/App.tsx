import UserForm from "./components/UserForm";
import RichTextEditor from "./components/RichTextEditor";
import Counter from "./components/Counter";
import { ChakraProvider } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Counter />
      <UserForm />
      <RichTextEditor />
    </ChakraProvider>
  );
}

export default App;
