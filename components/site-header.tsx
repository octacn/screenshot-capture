import { Box, BoxButton, DropdownBox, IconBox } from "./box";
import { Icons } from "./icons";

export default function SiteHeader() {
  return (
    <Box className="h-14 flex items-center justify-between sticky top-0 left-0 right-0 border-b">
      <Icons.logo className="size-6" />

      <div>
        <div>search</div> <div>capture</div>
      </div>

      <BoxButton>resolution</BoxButton>
      <IconBox>
        <Icons.nextjs />
      </IconBox>
      <DropdownBox />
      <div>theme</div>
    </Box>
  );
}
