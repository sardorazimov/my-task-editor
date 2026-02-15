/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({ file, setFile }: any) {

  if (!file) return null;

  return (
    <Editor
      height="100vh"
      theme="vs-dark"
      language="plaintext"
      value={file.content}
      onChange={(value) =>
        setFile({ ...file, content: value })
      }
    />
  );
}
