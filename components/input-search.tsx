"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { useCaptureScreenshot } from "@/hooks/capture-screenshot";

export function InputSearch() {
  const [url, setUrl] = React.useState<string>("");
  const { capture, loading } = useCaptureScreenshot();
  const router = useRouter();

  const handleCapture = async () => {
    if (!url.trim()) return;

    const result = await capture({ url: `https://${url}` });
    if (result) {
      router.push("/preview");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleCapture();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <InputGroup className="w-fit overflow-hidden">
        <InputGroupInput
          placeholder="example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <button
          onClick={handleCapture}
          disabled={loading || !url.trim()}
          className="border-l pl-2 flex h-auto items-center justify-center gap-2 py-1.5 text-sm font-medium bg-app/80 hover:bg-app cursor-pointer text-black order-last pr-3 has-[>button]:mr-[-0.45rem] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Capturing..." : "Capture"}
        </button>
      </InputGroup>
    </div>
  );
}
