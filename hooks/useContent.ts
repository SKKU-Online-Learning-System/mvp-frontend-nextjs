import { getPlaylists } from '@/app/api/content';
import { Filter } from '@/components/main/MainContent/category';
import { ContentResponseType } from '@/types/content';
import { useEffect, useState } from 'react';

export default function useContent(filters: Filter[] | undefined) {
  const [contents, setContents] = useState<ContentResponseType[]>();

  useEffect(() => {
    const id = filters?.find(({ checked }) => checked)?.id;

    const fetchContents = async () => {
      if (!id) {
        return;
      }

      const { contents } = await getPlaylists(id);
      setContents(contents);
    };
    fetchContents();
  }, [filters]);
  return { contents };
}
