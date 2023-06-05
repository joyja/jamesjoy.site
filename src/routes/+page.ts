import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, data }) => {
  console.log(url.searchParams)
	return { posts: data.posts };
};
