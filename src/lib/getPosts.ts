import { slugFromPath } from '$lib/slugFromPath';

export async function getPosts() {
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

  const posts = await Promise.all(postPromises);
  return posts
}