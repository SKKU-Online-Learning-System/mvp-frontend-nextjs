import { Skeleton } from '@/components/ui/skeleton';

export default function MainContentSkeleton() {
  return (
    <div className='flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs'>
      <Skeleton className='aspect-video w-full rounded-none' />
      <div className='flex flex-col gap-3 px-4 pb-4 pt-3.5'>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-3.5 w-full rounded-md' />
          <Skeleton className='h-3.5 w-4/5 rounded-md' />
        </div>
        <div className='flex flex-col gap-2 pt-1'>
          <Skeleton className='h-3 w-2/3 rounded-md' />
          <Skeleton className='h-3 w-1/4 rounded-md' />
        </div>
      </div>
    </div>
  );
}
