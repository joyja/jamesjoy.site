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
<div class="articles">
	<div class="articles__list">
		{#each data.posts as { slug, title, author, description, date }}
			<Article {slug}>
				<ArticleTitle {slug} {title} />
				<ArticleMeta {date} />
				<ArticleDescription {description} {slug} />
			</Article>
		{/each}
	</div>
	
	<nav class="pages">
	<a class="pages__prev" href={ `/?page=${ data.page > 1 ? data.page - 1 : 1 }` }>
		<svg class="pages__prev mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path fill-rule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clip-rule="evenodd" />
		</svg>
		Previous
	</a>
	<div class="pages__numbers">
		{#each [...Array(data.pages).keys()] as page}
			<a style:border-top={ page + 1 === data.page ? `solid 2px black` : null } href={`/?page=${page + 1}`}>{ page + 1 }</a>
		{/each}
	</div>
	<a class="pages__next" href={ `/?page=${ data.page < data.pages + 1 ? data.page + 1 : data.page }`}>
		Next
		<svg class="pages__next ml-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path fill-rule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clip-rule="evenodd" />
		</svg>
	</a>
	</nav>
</div>

<style lang="scss">
	.articles {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		&__list {
			flex-grow: 1;
		}
		flex-grow: 1;
	}
	.pages {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid var(--gray-300);	
		&__prev {
			display:flex;
			align-items: center;
			& > svg {
				margin-right: calc(var(--spacing-unit) * 3);
				width: 1.25rem;
				height: 1.25rem;
			}
		}
		&__numbers {
			display: flex;
			align-items: center;
			& > a {
				display: flex;
				align-items: center;
				padding: calc(var(--spacing-unit));
			}
		}
		&__next {
			display: flex;
			align-items: center;
			& > svg {
				margin-left: calc(var(--spacing-unit) * 3);
				width: 1.25rem;
				height: 1.25rem;
			}
		}
	}
</style>