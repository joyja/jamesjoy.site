import type { PageServerLoad } from './$types'
import { slugFromPath } from '$lib/slugFromPath'
import { redirect } from '@sveltejs/kit';

const MAX_POSTS = 10

export const load: PageServerLoad = async ({ url }) => {
	/** @type {import('./$types').PageLoad} */
	const modules = import.meta.glob(`/src/posts/*.{md,svx,svelte.md}`);

	const postPromises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then(
			(post) =>
				({
					slug: slugFromPath(path),
					...(post as unknown as App.MdsvexFile).metadata
				} as App.BlogPost)
		)
	);
	
	const page = url.searchParams.get('page') ? parseInt(url.searchParams.get('page') as string) : 1
	
	const posts = await Promise.all(postPromises);
	const publishedPosts = posts.filter((post) => post.published);
	const pages = Math.ceil(publishedPosts.length / MAX_POSTS)
	if (page > pages) {
		throw redirect(307,`/?page=${pages}`)
	}

	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return { posts: publishedPosts.slice(MAX_POSTS * (page - 1), MAX_POSTS * (page - 1) + MAX_POSTS), pages };
};
