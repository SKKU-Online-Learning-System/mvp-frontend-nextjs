import { PiWarningCircleLight } from 'react-icons/pi';

export default function NoResult() {
  return (
    <div className='flex flex-col w-full h-164 py-3 justify-center items-center gap-1 border shadow-sm rounded-2xl'>
      <PiWarningCircleLight className='inline-flex justify-center text-[14rem] font-light' />
      <p className='text-2xl'>조건에 맞는 결과가 없습니다.</p>
    </div>
  );
}
