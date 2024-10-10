import { forwardRef, useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ReactQuill from "react-quill";

import { Box, CircularProgress } from '@mui/material';

export const TextEditor = (props) => {
    const [showeditor,setShowEditor] = useState(false);

    const {customchange,note} = props;
  const editorRef = useRef(null);
  const apiKey = "48gui1zzaovkoqogj45wydgq6jgh13okavuvfq08mkzlcz2b"

  const modules = {
    toolbar: [
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "video"],
    ],
  };


  return (
    <>
    {showeditor&&    <Box sx={{ display: 'flex',justifyContent:"center" }}>
      <CircularProgress />
    </Box>}
      {/* <Editor
        
        onEditorChange={()=>customchange()}
        apiKey={apiKey}
        onInit={(_evt, editor) =>{
            setShowEditor(false)
             ref.current = editor}}
        // initialValue="<p>Add your Content here.</p>"
        init={{
          height: 350,
          menubar: false,
          statusbar: false,
          placeholder:"Type Your Content here...",
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      /> */}
      <ReactQuill
        theme="snow"
        value={note}
        onChange={customchange}
        modules={modules}
        placeholder="Enter Your Note Here..."
        required
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}