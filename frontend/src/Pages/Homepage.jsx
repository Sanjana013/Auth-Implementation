import React from "react";
import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/tabs";

import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const Demo = () => {
  return (
    <Tabs isFitted variant="unstyled">
      <TabList
        mb="1em"
        bg="#E2E8F0"
        p="2"
        borderRadius="0.5rem"
        height={"2.3rem"}
      >
        <Tab
          color="#2D3748"
          borderRadius="0.5rem"
          _selected={{ bg: "#2D3748", color: "white" }}
          _hover={{ bg: "#CBD5E0", color: "#1A202C" }}
          px={6}
          py={2}
          width={"50%"}
          fontWeight="bold"
          fontFamily="Open Sans"
          letterSpacing="wide"
        >
          Login
        </Tab>
        <Tab
          color="#2D3748"
          borderRadius="0.5rem"
          _selected={{ bg: "#2D3748", color: "white" }}
          _hover={{ bg: "#CBD5E0", color: "#1A202C" }}
          px={6}
          py={2}
          width={"50%"}
          fontWeight="bold"
          fontFamily="Open Sans"
          letterSpacing="wide"
        >
          Sign Up
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Login />
        </TabPanel>
        <TabPanel>
          <Signup />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={4}
        bg="#FFF8DC"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="1rem"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="#e2e8f0"
      >
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="#2D3748"
          fontFamily="Open Sans"
          letterSpacing="wide"
        >
          Yapp Space
        </Text>
      </Box>
      <Box
        bg="#FFF8DC"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        borderColor="#e2e8f0"
      >
        <Demo />
      </Box>
    </Container>
  );
};

export default Homepage;
