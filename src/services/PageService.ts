import { BASE_API, GET_PUBLISHED_POSTS } from '../common/api-path';
import { PAGE_ID } from '../common/constants';

export const getPublishedPosts = async (pageAccessToken: string) => {
  const response = await fetch(
    `${BASE_API}/${PAGE_ID}${GET_PUBLISHED_POSTS}?access_token=${pageAccessToken}`,
    { method: 'GET' }
  );
  const resJson = await response.json();
  return resJson?.data;
};
