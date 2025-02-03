import { useState } from "react";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
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
      height="50vh" // Set height to 50% of viewport height
      display="flex"
      flexDirection="column"
      p={5}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
      overflow="hidden" // Prevent overflow in the container
    >
      <Heading mb={4} textAlign="center">
        Rich Text Editor
      </Heading>
      {/* VStack to allow responsive spacing and button at the bottom */}
      <VStack align="stretch" flex="1" overflow="hidden">
        <Box flex="1" overflow="auto">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline"],
                ["link"],
                ["blockquote"],
                [{ align: [] }],
                ["clean"],
              ],
            }}
            style={{
              padding: "10px",
              lineHeight: "1.6",
              height: "100%", // Ensure Quill editor takes the full height of the Box
              overflowY: "auto", // Add vertical scroll if content exceeds available space
            }}
          />
        </Box>
        <Button colorScheme="blue" onClick={handleSave} alignSelf="flex-end">
          Save
        </Button>
      </VStack>
    </Box>
  );
};

export default RichTextEditor;
