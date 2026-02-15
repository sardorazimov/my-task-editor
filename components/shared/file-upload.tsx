/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function FileUpload({ onUploaded }: { onUploaded: (file: any) => void }) {

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {

    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/files/upload", {
      method: "POST",
      body: formData,
    });

    const saved = await res.json();

    onUploaded(saved);
  }

  return (

    <input
      type="file"
      accept=".txt"
      onChange={handleUpload}
    />

  );

}
