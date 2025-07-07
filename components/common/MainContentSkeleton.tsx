import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function MainContentSkeleton() {
  return (
    <Card className='relative rounded-lg z-0'>
      <div className='relative aspect-[16/9] w-full'>
        <Skeleton className='rounded-t-md object-cover object-center w-full h-full' />
      </div>
      <CardContent>
        <div className='flex flex-col gap-3 w-full h-full'>
          <Skeleton className='rounded-md w-full h-3' />
          <Skeleton className='rounded-md w-full h-3' />
        </div>
      </CardContent>
      <CardFooter>
        <div className='flex flex-col gap-3 w-full h-full'>
          <Skeleton className='rounded-md w-3/4 h-3' />

          <Skeleton className='rounded-md w-2/3 h-3' />
        </div>
      </CardFooter>
    </Card>
  );
}
