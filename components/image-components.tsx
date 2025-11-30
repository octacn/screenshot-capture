"use client";

import * as React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { BoxButton } from "@/components/box";
import { useScreenshotStorage } from "@/hooks/use-screenshot-storage";
import { BadgeInfo } from "lucide-react";
// import { useCaptureScreenshot } from "@/hooks/capture-screenshot";

function DownloadButton() {
  const { downloadScreenshot, screenshot } = useScreenshotStorage();

  const handleDownload = () => {
    const clearName = screenshot?.url
      ? screenshot.url
          .replace(/(^\w+:|^)\/\//, "")
          .replace(/[^a-z0-9]/gi, "-")
          .toLowerCase()
      : "screenshot";
    downloadScreenshot(clearName);
  };

  return (
    <BoxButton className="cursor-pointer" onClick={handleDownload}>
      Download
    </BoxButton>
  );
}

function ResetButton({
  children,
  ...props
}: React.ComponentProps<typeof BoxButton>) {
  const { clearScreenshot, hasScreenshot } = useScreenshotStorage();

  const handleCaptureNew = () => {
    clearScreenshot();
  };

  return (
    <BoxButton
      className="cursor-pointer"
      onClick={handleCaptureNew}
      {...props}
      disabled={!hasScreenshot}
    >
      {children}
    </BoxButton>
  );
}

function ImagePreviewHome() {
  const { screenshot, hasScreenshot } = useScreenshotStorage();
  // const { loading } = useCaptureScreenshot();

  // if (loading) {
  //   return (
  //     <div className="flex flex-col font-mono items-center justify-center text-center h-full">
  //       <p className="text-foreground/80 text-xl">Capturing screenshot...</p>
  //       <p className="text-muted-foreground mt-1">Please wait a moment.</p>
  //     </div>
  //   );
  // }

  if (!hasScreenshot) {
    return (
      <div className="flex flex-col font-mono items-center justify-center text-center h-full">
        <p className="text-foreground/80 text-xl">
          No screenshot captured yet.
        </p>
        <p className="text-muted-foreground mt-1">
          Enter a URL above and click Capture to take a screenshot.
        </p>
      </div>
    );
  }

  return (
    <Image
      src={screenshot?.imageData as string}
      alt={screenshot?.url as string}
      width={100}
      height={100}
      className="object-cover w-full"
    />
  );
}

function ImagePreviewPage() {
  const { screenshot, hasScreenshot } = useScreenshotStorage();

  React.useEffect(() => {
    if (!hasScreenshot) {
      redirect("/");
    }
  }, [hasScreenshot]);

  if (!hasScreenshot) {
    return null;
  }

  return (
    <section className="p-4">
      <PreviewDetails />

      <div className="border rounded-lg overflow-hidden shadow-lg">
        <Image
          width={100}
          height={100}
          src={screenshot?.imageData as string}
          alt={screenshot?.url as string}
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}

function PreviewDetails() {
  const { screenshot } = useScreenshotStorage();
  const [isOpen, setIsOpen] = React.useState(false);
  const detailsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <section className="w-fit absolute top-4 right-4 z-10 shadow-lg">
      <div
        ref={detailsRef}
        className="rounded-lg border bg-surface py-3 px-5 btn-inner-shadow"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 w-full font-medium transition-all"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="rounded-full"
          >
            <BadgeInfo />
          </motion.div>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10, width: 0 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  width: "auto",
                  transition: {
                    opacity: { duration: 0.3, ease: "easeOut" },
                    x: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                    width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                  },
                }}
                exit={{
                  opacity: 0,
                  x: -10,
                  width: 0,
                  transition: {
                    opacity: { duration: 0.2, ease: "easeIn" },
                    x: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                    width: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                  },
                }}
                className="overflow-hidden whitespace-nowrap"
              >
                Screenshot Details
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, scale: 0.95 }}
              animate={{
                height: "auto",
                opacity: 1,
                scale: 1,
                transition: {
                  height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.3, ease: "easeOut" },
                  scale: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                scale: 0.95,
                transition: {
                  height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.2, ease: "easeIn" },
                  scale: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                },
              }}
              className="overflow-hidden origin-top"
            >
              <motion.div
                className="text-sm text-muted-foreground mt-2.5"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
              >
                <p>Captured from: {screenshot?.url}</p>
                <p>
                  Captured at:{" "}
                  {screenshot?.capturedAt &&
                    new Date(screenshot.capturedAt).toLocaleString()}
                </p>
                <div className="grid grid-cols-2 gap-x-2 mt-2.5">
                  <DownloadButton />
                  <ResetButton>Capture New</ResetButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export { DownloadButton, ResetButton, ImagePreviewHome, ImagePreviewPage };
