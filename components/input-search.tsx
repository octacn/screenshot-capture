import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function InputSearch() {
  return (
    <InputGroup className="w-fit overflow-hidden">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <button className="border-l pl-2 flex h-auto items-center justify-center gap-2 py-1.5 text-sm font-medium bg-app/80 hover:bg-app cursor-pointer text-black order-last pr-3 has-[>button]:mr-[-0.45rem]">
        Capture
      </button>
    </InputGroup>
  );
}
