import {
  VideoComment,
  VideoCommentCreateRequest,
  VideoCommentMutationResponse,
  VideoCommentUpdateRequest,
} from '@/types/videoComment';
import axios from 'axios';
import { toast } from 'sonner';
import { api } from './axios';

export const getVideoComments = async (contentId: number) => {
  try {
    const response = await api.get<VideoComment[]>(
      '/contents/' + contentId + '/comments'
    );
    return response.data;
  } catch {
    toast.error('댓글을 불러오는 중 오류가 발생했습니다.');
    return [];
  }
};

export const createVideoComment = async (
  contentId: number,
  data: VideoCommentCreateRequest
) => {
  try {
    const response = await api.post<VideoCommentMutationResponse>(
      '/contents/' + contentId + '/comments',
      data
    );
    toast.success(
      data.parentId ? '답글이 등록되었습니다.' : '댓글이 등록되었습니다.'
    );
    return response.data;
  } catch {
    toast.error(
      data.parentId ? '답글 등록에 실패했습니다.' : '댓글 등록에 실패했습니다.'
    );
    return null;
  }
};

export const updateVideoComment = async (
  contentId: number,
  commentId: number,
  data: VideoCommentUpdateRequest,
  ownerToken: string
) => {
  try {
    await api.post(
      '/contents/' + contentId + '/comments/' + commentId + '/edit',
      data,
      { headers: { 'X-Owner-Token': ownerToken } }
    );
    toast.success('댓글을 수정했습니다.');
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      toast.error('본인이 작성한 댓글만 수정할 수 있습니다.');
      return false;
    }
    toast.error('댓글 수정에 실패했습니다.');
    return false;
  }
};

export const deleteVideoComment = async (
  contentId: number,
  commentId: number,
  ownerToken: string
) => {
  try {
    await api.post(
      '/contents/' + contentId + '/comments/' + commentId + '/delete',
      {},
      { headers: { 'X-Owner-Token': ownerToken } }
    );
    toast.success('댓글을 삭제했습니다.');
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      toast.error('본인이 작성한 댓글만 삭제할 수 있습니다.');
      return false;
    }
    toast.error('댓글 삭제에 실패했습니다.');
    return false;
  }
};
