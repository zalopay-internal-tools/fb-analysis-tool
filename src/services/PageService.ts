import { BASE_API, GET_PUBLISHED_POSTS } from '../common/api-path';
import { PAGE_ACCESS_TOKEN, PAGE_ID } from '../common/constants';

export const getPublishedPosts = async () => {
  const response = await fetch(
    `${BASE_API}/${PAGE_ID}${GET_PUBLISHED_POSTS}?access_token=${PAGE_ACCESS_TOKEN}`,
    { method: 'GET' }
  );
  const resJson = await response.json();
  return resJson?.data;
};
