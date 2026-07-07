export type VideoComment = {
  id: number;
  contentId: number;
  parentId: number | null;
  content: string | null;
  author: string;
  deleted: boolean;
  replies: VideoComment[];
  createdAt: string;
  updatedAt: string;
};

export type VideoCommentCreateRequest = {
  content: string;
  author: string;
  parentId?: number;
};

export type VideoCommentUpdateRequest = {
  content: string;
};

export type VideoCommentMutationResponse = {
  id: number;
  contentId: number;
  parentId: number | null;
  ownerToken: string;
  createdAt: string;
};
