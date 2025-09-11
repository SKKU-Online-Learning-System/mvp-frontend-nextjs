import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PropsWithChildren } from 'react';

type Props = {
  placeholder: string;
  onValueChange: (value: string) => void;
};

export default function SelectBox({
  placeholder,
  onValueChange,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger size='sm'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}
