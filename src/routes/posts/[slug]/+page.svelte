<script lang="ts">
	
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { SvelteComponentTyped } from 'svelte/internal';
	import { mermaidRendered } from '$lib/stores';
	
	import PageHead from '$lib/components/PageHead.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';
	import ArticleDescription from '$lib/components/ArticleDescription.svelte';
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
<ArticleTitle title={data.frontmatter.title} center={ true }/>
<ArticleDescription description={data.frontmatter.description} center={ true } />
<ArticleMeta date={data.frontmatter.date} center={ true }/>

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
	:global(main > ul) {
		list-style: disc;
		list-style-position: outside;
		margin-left: calc(var(--spacing-unit) * 5);
	}
	:global(main > ul > li) {
		padding-bottom: calc(var(--spacing-unit) * 3);
	}
	:global(main > ol) {
		list-style: decimal;
		list-style-position: outside;
		margin-left: calc(var(--spacing-unit) * 5);
	}
	:global(main > ol > li) {
		padding-bottom: calc(var(--spacing-unit) * 3);
	}
</style>