export const prerender = true;

/** @type {import('./$types').LayoutLoad} */
export const load = async ({ data, url: { pathname } }) => {
	return { pathname };
};
