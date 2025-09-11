import { PropsWithChildren } from 'react';

export default function ShadowRoundBox({ children }: PropsWithChildren) {
  return (
    <div className='flex flex-col w-full h-128 py-3 justify-center items-center gap-1 border shadow-sm rounded-2xl'>
      {children}
    </div>
  );
}
