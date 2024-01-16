import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, Container, HStack, Stack, VStack } from "@chakra-ui/react";
import Routing from "./pages/Routing";
import Header from "./common/Header";

function App() {
  return (
    <Box bg={"gray.50"} h={"100vh"}>
      <Header />
      <Box p={3}>
        <Routing />
      </Box>
    </Box>
  );
}

export default App;
