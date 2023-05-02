import React, { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const MyEditor = () => {
  const [editorData, setEditorData] = useState(
    '<section><div> <div style="border-top: 1px dashed rgb(0, 0, 0)"></div> <div>Điện thoại Điện thoại Điện thoại Điện thoại Điện thoại Điện thoại Điện thoại Điện thoại</div> <div style="display: flex; flex-direction: row-reverse"> <div>5,990,990</div> <div style="margin: 0 20px"></div> <div>1</div> </div> </div></section>'
  );
  const editorRef = useRef(null);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorData}
      onChange={handleEditorChange}
      ref={editorRef}
      //   config={{ removePlugins: ["Paragraph"] }}
      onReady={(editor) => {
        editor.model.schema.register("div", { inheritAllFrom: "$block" });
        editor.conversion.elementToElement({ model: "div", view: "div" });
      }}
    />
  );
};

export default MyEditor;
