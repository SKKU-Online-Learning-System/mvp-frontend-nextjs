import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import useUploadForm from '@/hooks/useUploadForm';

export default function VideoUploadSheet() {
  const { setContentData, uploadVideo } = useUploadForm();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>업로드</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>영상 업로드</SheetTitle>
          <SheetDescription>자신만의 영상을 업로드해보세요</SheetDescription>
        </SheetHeader>

        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-demo-name'>영상 URL</Label>
            <Input id='sheet-demo-name' placeholder='URL을 입력해주세요' />
            <Button onClick={setContentData}>영상 정보 가져오기</Button>
          </div>
        </div>

        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-demo-name'>제목</Label>
            <Input id='sheet-demo-name' placeholder='제목을 입력해주세요' />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-demo-username'>설명</Label>
            <Input
              id='sheet-demo-username'
              placeholder='강의 설명을 입력해주세요'
            />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-demo-username'>게시자</Label>
            <Input
              id='sheet-demo-username'
              placeholder='게시자를 입력해주세요'
            />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-demo-username'>썸네일</Label>
            <Input
              id='sheet-demo-username'
              placeholder='썸네일을 입력해주세요'
            />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-demo-username'>태그</Label>
            <Input id='sheet-demo-username' placeholder='태그를 입력해주세요' />
          </div>
        </div>
        <SheetFooter>
          <Button type='submit'>업로드</Button>
          <SheetClose asChild>
            <Button variant='outline'>취소</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
