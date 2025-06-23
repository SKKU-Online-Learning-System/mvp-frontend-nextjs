import { FiLoader } from 'react-icons/fi';

export default function Loading() {
  return (
    <div className='flex flex-col w-full justify-center items-center gap-1 pt-16'>
      <FiLoader className='inline-flex justify-center text-[12rem] font-light' />
      <p className='text-2xl'>Loading...</p>
    </div>
  );
}
