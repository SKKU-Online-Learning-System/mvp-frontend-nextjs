'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { queryAtom } from '@/stores/atom';
import { useSetAtom } from 'jotai';
import { ChangeEvent, useEffect, useState } from 'react';

export function SearchBar() {
  const setQueryAtom = useSetAtom(queryAtom);

  const [inputValue, setInputValue] = useState('');

  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    setQueryAtom(debouncedValue);
  }, [debouncedValue, setQueryAtom]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <div className='flex h-9 w-64 items-center rounded-md border px-2 shadow-xs'>
      <input
        type='text'
        value={inputValue}
        onInput={onChange}
        placeholder='검색어를 입력하세요'
        className='w-full flex-1 border-none outline-none focus:ring-0 text-sm'
      />
    </div>
  );
}
