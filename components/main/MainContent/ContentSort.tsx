import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ContentSort() {
  return (
    <Select onValueChange={() => {}}>
      <SelectTrigger size='sm'>
        <SelectValue placeholder='정렬기준' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='upload'>업로드순</SelectItem>
        <SelectItem value='view'>조회순</SelectItem>
      </SelectContent>
    </Select>
  );
}
