import { Flex, Heading, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex h={16} alignItems={"center"} bg={"blue.100"} px={4}>
      <Heading size="md" as="h3">Contacts</Heading>
    </Flex>
  );
};

export default Header;
