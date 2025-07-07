'use client';

import search_button from '@/app/asset/search_button.svg';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get('category');
  const query = searchParams.get('query');

  if (inputRef.current && !query) {
    inputRef.current.value = '';
  }

  const onClick = () => {
    router.push(
      category
        ? `/?query=${inputRef.current?.value}&category=${category}`
        : `/?query=${inputRef.current?.value}`
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div className='flex h-12 w-[75%] items-center rounded-xl border px-4'>
      <input
        type='text'
        ref={inputRef}
        onKeyDown={handleKeyDown}
        placeholder='명륜당에서 원하는 강의를 찾아보세요!'
        className='w-full flex-1 border-none outline-none focus:ring-0 max-sm:text-sm'
      />
      <button
        className='flex items-center justify-center rounded-full'
        onClick={onClick}
      >
        <Image src={search_button} alt='search button' width={30} height={30} />
      </button>
    </div>
  );
}
