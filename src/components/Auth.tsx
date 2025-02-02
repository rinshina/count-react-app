import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Button, Flex, Box } from "@chakra-ui/react";
import UserForm from "./UserForm";

interface AuthProps {
  setIsLoggedIn: (status: boolean) => void;
}

const Auth = ({ setIsLoggedIn }: AuthProps) => {
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's Sign Up or Sign In

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      direction="column"
      gap="20px"
    >
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const { credential } = credentialResponse;
          if (credential) {
            console.log(credential);
            setIsLoggedIn(true); // On successful Google login
          }
        }}
        onError={() => console.log("login failed")}
      />
      <Box>OR</Box>
      <Flex gap="10px">
        <Button onClick={() => setIsSignUp(false)}>Sign In</Button>
        <Button onClick={() => setIsSignUp(true)}>Sign Up</Button>
      </Flex>
      {/* Show UserForm with the appropriate mode (Sign In or Sign Up) */}
      <UserForm isSignUp={isSignUp} setIsLoggedIn={setIsLoggedIn} />
    </Flex>
  );
};

export default Auth;
