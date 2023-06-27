<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { SvelteComponentTyped } from 'svelte/internal';
	import { mermaidRendered } from '$lib/stores';

	import PageHead from '$lib/components/PageHead.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';
	import mermaid from 'mermaid'

	export let data: PageData;

	type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	$: component = data.component as unknown as C;
	mermaid.initialize({ theme: 'neutral', startOnLoad: false })
	onMount(() => {
		mermaidRendered.set(true)
		setTimeout(async () => {
			await mermaid.run()
    }, 0)
	})
</script>

<PageHead title={data.frontmatter.title} description={data.frontmatter.description} />
<ArticleTitle title={data.frontmatter.title} />
<ArticleMeta date={data.frontmatter.date} />

<svelte:component this={component} />

<style>
	:global(main > p > img, main > p > a > img) {
		overflow: hidden;
		border-radius: var(--rounded-md);
		max-width: 100%;
	}
	:global(pre) {
		border-radius: var(--rounded-md);
		margin-bottom: calc(var(--spacing-unit)*5)!important;
	}
	:global(main > p > code) {
		border-radius: var(--rounded-sm);
		padding-right: calc(var(--spacing-unit));
		padding-left: calc(var(--spacing-unit));
		background-color: var(--gray-300);
	}
</style>