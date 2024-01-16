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
import { useLazyGetContactByIdQuery } from "../app/services/endpoints/contact";
import { useRef, useState } from "react";
import { ContactModel } from "../app/services/models/contactModel";
import ContactDetail from "./components/ContactDetails";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

const Home = () => {
  const [contactDetail, setContactDetail] = useState<ContactModel | undefined>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const [getContactQuery, getContactResult] = useLazyGetContactByIdQuery();
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    id: Yup.number().required().label("ID"),
  });

  const { handleSubmit, errors, values, touched, handleChange } = useFormik({
    validationSchema: formSchema,
    initialValues: {
      id: "",
    },
    onSubmit: () => {
      setErrorMsg(undefined);
      setContactDetail(undefined);
      getContactQuery(+values.id)
        .unwrap()
        .then((res: any) => {
          setContactDetail(res);
        })
        .catch((res) => {
          if(res.data)
            setErrorMsg(res.data.errorMessage);
          else
            setErrorMsg("Server Error");
        });
    },
  });

  return (
    <Box>
      <Button onClick={() => navigate("/add")} mb={3} size="sm" variant="solid" colorScheme="green">
        Got to Add
      </Button>
      <HStack spacing={3} alignItems="start">
        <form onSubmit={handleSubmit}>
          <Card maxW={500} w="full">
            <CardBody>
              <FormControl maxW={300} isInvalid={!!errors.id && touched.id}>
                <FormLabel>Enter ID</FormLabel>
                <Input id="id" name="id" type="number" onChange={handleChange} value={values.id} />
                <FormErrorMessage>{errors.id}</FormErrorMessage>
              </FormControl>
            </CardBody>
            <CardFooter>
              <Button size="sm" type="submit" colorScheme="blue">
                Search Contact
              </Button>
            </CardFooter>
          </Card>
        </form>
        {
          getContactResult.isFetching || getContactResult.isLoading &&
          <Spinner />
        }
        {contactDetail && (
          <Card w="full" maxW={300}>
            <CardBody>
              <ContactDetail details={contactDetail} />
            </CardBody>
          </Card>
        )}
        {getContactResult.isError && errorMsg && (
          <Alert status="error" maxW={500}>
            {errorMsg}
          </Alert>
        )}
      </HStack>
    </Box>
  );
};
export default Home;
