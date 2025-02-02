import { useState } from "react";
import { Box, Button, Stack, Heading } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = () => {
  const [content, setContent] = useState("");

  const handleSave = () => {
    localStorage.setItem("richTextContent", content);
    alert("Content Saved!");
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      p={5}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
    >
      <Heading mb={4} textAlign="center">
        Rich Text Editor
      </Heading>
      {/* Use Stack with spacing */}
      <Stack spacing={4}>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        <Button colorScheme="blue" onClick={handleSave}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default RichTextEditor;
