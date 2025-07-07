import { createContent } from '@/app/api/content';
import { searchContent } from '@/app/api/search';
import { ContentRequestType } from '@/app/type/content';
import { ChangeEvent, useState } from 'react';

export default function useUploadForm() {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState('');

  const onChangeTitle = (e : ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

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

  return {
    title,
    description,
    author,
    thumbnail,
    tags,
    link,
    uploadVideo,
    setContentData,
  };
}
