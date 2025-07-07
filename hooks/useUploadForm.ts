import { createContent } from '@/app/api/content';
import { searchContent } from '@/app/api/search';
import { ContentRequestType } from '@/types/content';
import { ChangeEvent, useState } from 'react';

export default function useUploadForm() {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState('');

  const onChangeLink = (e: ChangeEvent<HTMLInputElement>) =>
    setLink(e.currentTarget.value);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) =>
    setDescription(e.currentTarget.value);

  const onChangeAuthor = (e: ChangeEvent<HTMLInputElement>) =>
    setAuthor(e.currentTarget.value);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) =>
    setThumbnail(e.currentTarget.value);

  const onChangeTags = (e: ChangeEvent<HTMLInputElement>) =>
    setTags(e.currentTarget.value);

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

  const uploadVideo = async () => {
    if (!title || !description || !author || !link || !thumbnail) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

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
  };

  return {
    link,
    title,
    description,
    author,
    thumbnail,
    tags,
    onChangeLink,
    onChangeTitle,
    onChangeDescription,
    onChangeAuthor,
    onChangeThumbnail,
    onChangeTags,
    uploadVideo,
    setContentData,
  };
}
