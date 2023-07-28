
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react";

const validationSchema = Yup.object({
  title: Yup.string().required('Please provide the title').min(3, 'Please give 3 characters long').max(60, 'Body is too long 15 ch are allowed'),
  body: Yup.string().required('Please provide the body').min(3, 'Please give 3 characters long').max(60, 'Body is too long 15 ch are allowed'),
  image: Yup.mixed().required('Please upload a file')
});

export default function Form() {
  const [imagePreview, setImagePreview] = useState<any>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      image: null
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });


  const acceptedFile: any = "image/*"

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFile,
    onDrop: (acceptedFiles) => {
      formik.setFieldValue("image", acceptedFiles[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(acceptedFiles[0]);
    }
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl isInvalid={formik.touched.title && !!formik.errors.title}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                name="title"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.touched.body && !!formik.errors.body}>
              <FormLabel htmlFor="body">Body</FormLabel>
              <Input
                id="body"
                name="body"
                type="text"
                variant="filled"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.body}
              />
              <FormErrorMessage>{formik.errors.body}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="image">Image</FormLabel>
              <Box
                {...getRootProps()}
                borderWidth={2}
                borderStyle="dashed"
                borderColor="gray.400"
                borderRadius="md"
                p={4}
                cursor="pointer"
              >
                <input {...getInputProps()} />
                <p>Drag 'n' drop an image here, or click to select an image</p>
              </Box>
              {imagePreview && (
                <Box mt={2}>
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                </Box>
              )}
              {formik.touched.image && formik.errors.image ? (
                <Box color="red" mt={1}>
                  {formik.errors.image}
                </Box>
              ) : null}
            </FormControl>
            <Button type="submit" colorScheme="purple" width="full">
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
