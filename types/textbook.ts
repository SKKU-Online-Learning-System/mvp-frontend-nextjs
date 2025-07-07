export type TextBookResponseType = {
  id: number;
  title: string;
  description: string;
  author: string;
  thumbnailUrl: string;
  viewCount: number;
};

export type TextBookDetailResponseType = {
  id: number;
  title: string;
  description: string;
  author: string;
  uploadDate: string;
  thumbnailUrl: string;
  fileName: string;
  viewCount: number;
};

export type TextBookRequestType = {
  type: 'YOUTUBE' | 'INFLEARN';
  title: string;
  description: string;
  author: string;
  duration: number;
  link: string;
  thumbnailUrl: string;
  tags: string[];
};
