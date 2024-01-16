import { Box, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import { ContactModel } from "../../app/services/models/contactModel";

type Props = {
  details: ContactModel;
};

const ContactDetail = ({ details }: Props) => {
  return (
    <Box>
      <Table>
        <Tbody>
          <Tr>
            <Td>Id</Td>
            <Td>{details.id}</Td>
          </Tr>
          <Tr>
            <Td>Name</Td>
            <Td>{details.name}</Td>
          </Tr>
          <Tr>
            <Td>Phone</Td>
            <Td>{details.phoneNumber}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default ContactDetail;
