import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectOptionProps {
  title: string;
  items: {
    id: string;
    label: string;
  }[];
  defaultValue: number;
  onValueChange?: (value: string) => void;
}

export function SelectOption({ ...props }: SelectOptionProps) {
  return (
    <Select
      onValueChange={props.onValueChange}
      defaultValue={props.items[Number(props.defaultValue) - 1].id}
    >
      <SelectTrigger size="sm">
        <SelectValue placeholder={props.title} />
      </SelectTrigger>
      <SelectContent>
        {props.items.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
