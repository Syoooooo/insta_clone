import {
  Box,
  Flex,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import Login from "./Login";
import Signup from "./Signup";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box
        border={"qpx solid gray"}
        borderRadius={4}
        padding={5}
      >
        <VStack spacing={4}>
          <Image src="/logo.png" />

          {isLogin ? <Login /> : <Signup />}

          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            {/* OR */}

            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={"1"} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

        <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"}/>
        </VStack>
      </Box>

      <Box
        border={"1px solid gray"}
        borderRadius={4}
        padding={5}
      >
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box mx={2} fontSize={14}>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            cursor={"pointer"}
            color={"blue.500"}
          >
            {isLogin ? "Sign up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};
export default AuthForm;
