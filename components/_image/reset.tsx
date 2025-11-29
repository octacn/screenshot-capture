"use client";

import { useScreenshotStorage } from "@/hooks/use-screenshot-storage";
import { IconBox } from "../box";
import { Repeat2 } from "lucide-react";

export default function Reset() {
  const { clearScreenshot } = useScreenshotStorage();

  return (
    <IconBox onClick={clearScreenshot}>
      <Repeat2 />
    </IconBox>
  );
}
