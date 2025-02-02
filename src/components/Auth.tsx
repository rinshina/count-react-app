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
      height="100vh"
      direction="column"
      gap="20px"
    >
      <UserForm setIsLoggedIn={setIsLoggedIn} />
    </Flex>
  );
};

export default Auth;
