import { ChakraProvider } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function GoogleSignIn() {
  const navigate = useNavigate();

  return (
    <ChakraProvider value={defaultSystem}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const { credential } = credentialResponse;
          if (credential) {
            console.log(credential);
            console.log(jwtDecode(credential)); // Safe to call now
            navigate("/App");
          } else {
            console.log("No credential received.");
          }
        }}
        onError={() => console.log("login failed")}
      />
    </ChakraProvider>
  );
}

export default GoogleSignIn;
