import { Box, BoxButton } from "@/components/box";
import { Icons } from "@/components/icons";
import SelectOption from "@/components/select-option";
import { InputSearch } from "@/components/input-search";
import { ButtonGroup } from "@/components/ui/button-group";
import DownloadButton from "@/components/_image/download";
import Link from "next/link";
import Reset from "./_image/reset";

export default function SiteHeader() {
  return (
    <Box className="h-12 flex items-center justify-between sticky top-0 left-0 right-0 border-b">
      <div className="flex gap-x-4">
        <Icons.logo className="size-6" />
        {<InputSearch />}
      </div>
      <Reset />
      <div className="flex gap-x-3">
        <SelectOption title="resolution" />
        <SelectOption title="theme" />
        <SelectOption title="image type" />
        <div className="w-px h-auto bg-border" />
        <ButtonGroup>
          <DownloadButton />
          <BoxButton className="relative overflow-hidden">
            Preview
            <Link href={"/preview"} className="absolute inset-0" />
          </BoxButton>
        </ButtonGroup>
      </div>
    </Box>
  );
}
