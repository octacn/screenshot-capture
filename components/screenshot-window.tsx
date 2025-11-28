"use client";
import { useState } from "react";

export default function Screen() {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const capture = async () => {
    setLoading(true);
    setImage(null);

    const res = await fetch("/api/screenshot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const blob = await res.blob();
    const img = URL.createObjectURL(blob);

    setImage(img);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Website Screenshot Tool</h1>

      <input
        className="border p-2 w-80 rounded"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={capture}
        className="bg-black text-white px-4 py-2 mt-3 rounded"
      >
        Capture Screenshot
      </button>

      {loading && <p className="mt-4">Capturing...</p>}

      {image && (
        <img
          src={image}
          alt="Screenshot"
          className="mt-6 border shadow max-w-full"
        />
      )}
    </main>
  );
}
