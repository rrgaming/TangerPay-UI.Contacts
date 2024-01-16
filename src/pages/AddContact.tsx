import {
  Alert,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Spinner,
} from "@chakra-ui/react";
import {
  useAddContactMutation,
  useLazyGetContactByIdQuery,
} from "../app/services/endpoints/contact";
import { useRef, useState } from "react";
import { AddContactModel, ContactModel } from "../app/services/models/contactModel";
import ContactDetail from "./components/ContactDetails";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddContact = () => {
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [addContactQuery, addContactResult] = useAddContactMutation();
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    phoneNumber: Yup.string().required().label("Phone Number"),
  });

  const { handleSubmit, errors, values, touched, handleChange, resetForm } = useFormik({
    validationSchema: formSchema,
    initialValues: {
      name: "",
      phoneNumber: "",
    },
    onSubmit: () => {
      setErrorMsg(undefined);
      const payload: AddContactModel = {
        name: values.name,
        phoneNumber: values.phoneNumber.toString(),
      };
      addContactQuery(payload)
        .unwrap()
        .then((res: any) => {
          console.log(res);
          resetForm();
        })
        .catch((res) => {
          if (res.data) {
            setErrorMsg(res.data.errorMessage);
          }
        });
    },
  });

  return (
    <Box>
      <Button onClick={() => navigate("/")} mb={3} size="sm" variant="solid" colorScheme="green">
        Go to Search
      </Button>
      <HStack spacing={3} alignItems="start">
        <form onSubmit={handleSubmit}>
          <Card maxW={500}>
            <CardBody>
              <FormControl maxW={300} isInvalid={!!errors.name && touched.name}>
                <FormLabel>Enter Name</FormLabel>
                <Input id="name" name="name" onChange={handleChange} value={values.name} />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl maxW={300} isInvalid={!!errors.phoneNumber && touched.phoneNumber}>
                <FormLabel>Enter Phone Number</FormLabel>
                <Input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={values.phoneNumber}
                />
                <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
              </FormControl>
            </CardBody>
            <CardFooter>
              <Button size="sm" type="submit" colorScheme="blue">
                Add Contact
              </Button>
            </CardFooter>
          </Card>
        </form>
        {addContactResult.isLoading && <Spinner />}
        {addContactResult.isError && errorMsg && (
          <Alert status="error" maxW={500}>
            {errorMsg}
          </Alert>
        )}
        {addContactResult.isSuccess && (
          <Alert status="success" maxW={500}>
            Contact added successfully
          </Alert>
        )}
      </HStack>
    </Box>
  );
};
export default AddContact;
