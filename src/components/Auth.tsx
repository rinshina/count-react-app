import { Flex } from "@chakra-ui/react";
import UserForm from "./UserForm";

interface AuthProps {
  setIsLoggedIn: (status: boolean) => void;
}

const Auth = ({ setIsLoggedIn }: AuthProps) => {
  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh" // Ensure it fully occupies the viewport
      width="100vw"
      direction="column"
      bg="gray.100" // Optional background for contrast
      p={4} // Padding to prevent touching edges
    >
      <UserForm setIsLoggedIn={setIsLoggedIn} />
    </Flex>
  );
};

export default Auth;
