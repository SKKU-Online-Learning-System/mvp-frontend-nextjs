export type ContentResponseType = {
  id: number;
  type: 'YOUTUBE' | 'INFLEARN' | 'BOOK';
  title: string;
  description: string;
  author: string;
  duration: number;
  link: string;
  thumbnailUrl: string;
  tags: string[];
  viewCount: number;
  likeCount: number;
  isLike: boolean;
  publishedAt: string;
  youtubeVideoId: string;
};

export type PlaylistResonseType = {
  id: number;
  name: string;
  description: string;
  contents: ContentResponseType[];
};

export type ContentDetailResponseType = {
  id: number;
  type: 'YOUTUBE' | 'INFLEARN' | 'BOOK';
  title: string;
  description: string;
  author: string;
  duration: number;
  link: string;
  thumbnailUrl: string;
  tags: string[];
  viewCount: number;
  likeCount: number;
  isLike: boolean;
  youtubeVideoId: string;
};

export type ContentRequestType = {
  type: 'YOUTUBE' | 'INFLEARN';
  title: string;
  description: string;
  author: string;
  duration: number;
  link: string;
  thumbnailUrl: string;
  tags: string[];
};

export type Sort = 'upload' | 'view';
