import { BiError } from 'react-icons/bi';

export default function Error() {
  return (
    <div className='flex flex-col w-full justify-center items-center gap-1 pt-16'>
      <BiError className='inline-flex justify-center text-[14rem] font-light' />
      <p className='text-2xl'>관련된 영상이 없습니다.</p>
    </div>
  );
}
