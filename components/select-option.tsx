import { useId } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function Component({ title }: { title: string }) {
  const id = useId();
  return (
    <Select defaultValue="1">
      <SelectTrigger id={id} size="sm">
        {title}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Javascript</SelectItem>
        <SelectItem value="2">Bash</SelectItem>
      </SelectContent>
    </Select>
  );
}
