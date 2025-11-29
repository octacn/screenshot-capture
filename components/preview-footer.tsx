import Link from "next/link";
import { Box, BoxButton } from "./box";

export default function PreviewFooter() {
  return (
    <Box className="fixed bottom-0 left-0 right-0 z-30 w-full h-20 bg-surface border-t border-border flex items-center justify-between">
      <Link href={"/"}>
        <BoxButton variant={"secondary"} className="rounded-full" size={"lg"}>
          Back to home
        </BoxButton>
      </Link>
      <BoxButton variant={"secondary"} className="rounded-full" size={"lg"}>
        Download
      </BoxButton>
      <BoxButton variant={"secondary"} className="rounded-full" size={"lg"}>
        Capture New
      </BoxButton>
    </Box>
  );
}
