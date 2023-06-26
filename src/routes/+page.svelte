<script lang="ts">
	import type { PageData } from './$types'

	import PageHead from '$lib/components/PageHead.svelte'
	import Article from '$lib/components/Article.svelte'
	import ArticleTitle from '$lib/components/ArticleTitle.svelte'
	import ArticleMeta from '$lib/components/ArticleMeta.svelte'
	import ArticleDescription from '$lib/components/ArticleDescription.svelte'

	export let data: PageData;
</script>

<PageHead title="Home" description="Industrial Automation SME | Professional Electrical Engineer | Developer | 3D Printing Guy" />

{#each data.posts as { slug, title, author, description, date }}
	<Article {slug}>
		<ArticleTitle {slug} {title} />
		<ArticleMeta {date} />
		<ArticleDescription {description} {slug} />
	</Article>
{/each}

<slot />