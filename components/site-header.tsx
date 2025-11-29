import { Box, BoxButton } from "@/components/box";
import { Icons } from "@/components/icons";
import SelectOption from "@/components/select-option";
import { InputSearch } from "@/components/input-search";

export default function SiteHeader() {
  return (
    <Box className="h-12 flex items-center justify-between sticky top-0 left-0 right-0 border-b">
      <div className="flex gap-x-4">
        <Icons.logo className="size-6" />
        <InputSearch />
      </div>
      <div className="flex gap-x-3">
        <SelectOption title="resolution" />
        <SelectOption title="theme" />
        <SelectOption title="image type" />
        <div className="w-px h-auto bg-border" />
        <BoxButton>Download Button</BoxButton>
      </div>
    </Box>
  );
}
