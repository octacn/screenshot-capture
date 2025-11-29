"use client";

import * as React from "react";
import { Box, BoxButton } from "@/components/box";
import { Icons } from "@/components/icons";
import { SelectOption } from "@/components/select-option";
import { ButtonGroup } from "@/components/ui/button-group";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { useCaptureScreenshot } from "@/hooks/capture-screenshot";
import { ScreenshotSchema, Theme } from "@/types/screenshot-type";
import { DownloadButton, ResetButton } from "@/components/image-components";
import { Repeat2 } from "lucide-react";

export default function SiteHeader() {
  const [url, setUrl] = React.useState<string>("");
  const [theme, setTheme] = React.useState<ScreenshotSchema["theme"]>("dark");
  const [height, setHeight] = React.useState<ScreenshotSchema["height"]>(1080);
  const [width, setWidth] = React.useState<ScreenshotSchema["width"]>(1920);
  const [imageType, setImageType] =
    React.useState<ScreenshotSchema["imageType"]>("png");

  const { capture, loading } = useCaptureScreenshot();

  const handleCapture = async () => {
    if (!url.trim()) return;
    await capture({
      url: `https://${url}`,
      theme,
      height,
      width,
      imageType: imageType,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleCapture();
    }
  };

  const handleResolutionChange = (value: string) => {
    const [w, h] = value.split("x").map(Number);
    setWidth(w);
    setHeight(h);
  };

  const handleThemeChange = (value: string) => {
    setTheme(value as Theme);
  };

  const handleImageTypeChange = (value: string) => {
    setImageType(value as ScreenshotSchema["imageType"]);
  };

  const resolutionOptions = {
    title: "Select Resolution",
    items: [
      { id: "800x600", label: "800x600" },
      { id: "1024x768", label: "1024x768" },
      { id: "1280x720", label: "1280x720" },
      { id: "1920x1080", label: "1920x1080" },
    ],
    onValueChange: handleResolutionChange,
    defaultValue: 4,
  };

  const themeOptions = {
    title: "Select Theme",
    items: [
      { id: "light", label: "Light" },
      { id: "dark", label: "Dark" },
    ],
    onValueChange: handleThemeChange,
    defaultValue: 2,
  };

  const imageTypeOptions = {
    title: "Select Resolution",
    items: [
      { id: "png", label: "PNG" },
      { id: "jpeg", label: "JPEG" },
      { id: "webp", label: "WEBP" },
    ],
    onValueChange: handleImageTypeChange,
    defaultValue: 1,
  };
  return (
    <Box className="h-12 flex items-center justify-between sticky top-0 left-0 right-0 border-b">
      <div className="flex gap-x-4">
        <Icons.logo className="size-6" />
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
        <ResetButton size={"icon-sm"} variant={"outline"}>
          <Repeat2 />
        </ResetButton>
      </div>
      <div className="flex gap-x-3">
        <SelectOption {...resolutionOptions} />
        <SelectOption {...themeOptions} />
        <SelectOption {...imageTypeOptions} />
        <div className="w-px h-auto bg-border" />
        <ButtonGroup>
          <BoxButton className="relative overflow-hidden">
            Preview
            <Link href={"/preview"} className="absolute inset-0" />
          </BoxButton>
          <DownloadButton name={url} />
        </ButtonGroup>
      </div>
    </Box>
  );
}
