import { BASE_API, GET_COMMENTS, GET_REACTIONS } from '../common/api-path';
import { REACTION_TYPE } from '../common/constants';

export const getPostDetail = async (
  postId: string,
  pageAccessToken: string
) => {
  const response = await fetch(
    `${BASE_API}/${postId}?access_token=${pageAccessToken}`,
    { method: 'GET' }
  );
  const resJson = await response.json();
  return resJson;
};

export const getPostReactions = async (
  postId: string,
  type: REACTION_TYPE = REACTION_TYPE.NONE,
  pageAccessToken: string
) => {
  const response = await fetch(
    `${BASE_API}/${postId}${GET_REACTIONS}${
      type !== REACTION_TYPE.NONE ? `&type=${type}` : ''
    }&access_token=${pageAccessToken}`,
    {
      method: 'GET',
    }
  );
  const resJson = await response.json();
  return { data: resJson?.data, summary: resJson?.summary };
};

export const getPostComments = async (
  postId: string,
  pageAccessToken: string
) => {
  const response = await fetch(
    `${BASE_API}/${postId}${GET_COMMENTS}&access_token=${pageAccessToken}`,
    {
      method: 'GET',
    }
  );
  const resJson = await response.json();
  return resJson?.data;
};

export const getCommentReactions = async (
  commentId: string,
  pageAccessToken: string,
  type: REACTION_TYPE = REACTION_TYPE.NONE
) => {
  const response = await fetch(
    `${BASE_API}/${commentId}${GET_REACTIONS}${
      type !== REACTION_TYPE.NONE ? `&type=${type}` : ''
    }&access_token=${pageAccessToken}`,
    {
      method: 'GET',
    }
  );
  const resJson = await response.json();
  return { data: resJson?.data, summary: resJson?.summary };
};

export const getCommentReplies = async (
  commentId: string,
  pageAccessToken: string
) => {
  const response = await fetch(
    `${BASE_API}/${commentId}${GET_COMMENTS}&access_token=${pageAccessToken}`,
    {
      method: 'GET',
    }
  );
  const resJson = await response.json();
  return { data: resJson?.data, summary: resJson?.summary };
};
