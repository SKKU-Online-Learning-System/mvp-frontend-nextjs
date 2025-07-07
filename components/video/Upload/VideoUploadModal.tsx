'use client';

import { createContent } from '@/app/api/content';
import { searchContent } from '@/app/api/search';
import { ContentRequestType } from '@/types/content';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { InputBox } from './InputBox';

export function VideoUploadModal() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [link, setLink] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState('');

  const uploadVideo = async () => {
    const content: ContentRequestType = {
      type: 'YOUTUBE', // INFLEARN 추가해야함..
      title,
      description,
      author,
      duration: 0,
      link,
      thumbnailUrl: thumbnail,
      tags: tags.split(','),
    };
    console.log(content);
    createContent(content);
    router.back();
  };

  const setContentData = async () => {
    try {
      const contentData = await searchContent(link);
      setTitle(contentData.title);
      setDescription(contentData.description);
      setAuthor(contentData.author);
      setThumbnail(contentData.thumbnailUrl);
      setTags(contentData.tags.join(','));
      console.log(contentData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className='fixed z-30 flex h-full w-full items-center justify-center'>
        <div className='flex h-3/4 w-3/4 flex-col items-center justify-between rounded-3xl bg-white px-12 py-8'>
          <div className='flex w-full flex-row justify-between'>
            <h1 className='text-[2.5rem] font-bold'>영상 등록</h1>
            <div
              onClick={() => {
                router.back();
              }}
              className='cursor-pointer'
            >
              <IoClose size={35} />
            </div>
          </div>
          <h2 className='self-start text-[1.5rem] font-bold'>
            영상 정보 가져오기
          </h2>
          <InputBox
            label='링크'
            placeholder='링크를 입력해주세요'
            setData={setLink}
            data={link}
          />
          <button
            className='self-end rounded-xl bg-green-800 px-8 py-3 text-[1.2rem] text-white'
            onClick={setContentData}
          >
            링크 정보 가져오기
          </button>
          <div className='h-0.5 w-full bg-gray-300'></div>
          <h2 className='self-start text-[1.5rem] font-bold'>
            영상 정보 확인하기
          </h2>
          <InputBox
            label='제목'
            placeholder='제목을 입력해주세요'
            setData={setTitle}
            data={title}
          />
          <InputBox
            label='설명'
            placeholder='강의 설명을 입력해주세요'
            setData={setDescription}
            data={description}
          />
          <InputBox
            label='저자'
            placeholder='저자를 입력해주세요'
            setData={setAuthor}
            data={author}
          />

          <InputBox
            label='썸네일'
            placeholder='썸네일을 입력해주세요'
            setData={setThumbnail}
            data={thumbnail}
          />
          <InputBox
            label='태그'
            placeholder='태그를 입력해주세요'
            setData={setTags}
            data={tags}
          />
          <button
            className='self-end rounded-xl bg-green-800 px-8 py-3 text-[1.2rem] text-white'
            onClick={uploadVideo}
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
}
