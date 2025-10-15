import { TextBookDetailResponseType } from '@/types/textbook';
import { IoMdDownload } from 'react-icons/io';
import Image from 'next/image';

type Props = {
  content: TextBookDetailResponseType;
};

export default function TextBookInfo({ content }: Props) {
  const { title, description, author, uploadDate, thumbnailUrl, fileName } =
    content;
  return (
    <div className='flex flex-col pb-20'>
      <div className='flex flex-wrap justify-between'>
        <div className='flex gap-2'>
          <p>{`[${author}]`}</p>
          <p>{title}</p>
        </div>
        <p>{description}</p>
        <div className='flex items-center gap-1'>
          {/* <p>조회수 {viewCount}</p> */}
          {/* <RxDividerVertical /> */}
          <p>{uploadDate}</p>
        </div>
      </div>

      <hr className='my-4 border-t border-gray-300' />

      <a
        href='/file/textbooks/컴퓨팅사고와문제해결.pdf'
        download
        className='flex w-fit items-center gap-2 underline'
      >
        <IoMdDownload className='text-xl' />
        {fileName}
      </a>

      <hr className='my-4 border-t border-gray-300' />

      <Image
        className='mx-auto w-4/5 rounded-lg bg-slate-300'
        width={300}
        height={300}
        src={thumbnailUrl}
        alt='썸네일'
      ></Image>
    </div>
  );
}
