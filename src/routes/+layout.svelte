<script lang="ts">
	import '@fontsource/kelly-slab'
	import '@fontsource/open-sans'
	import "../css/index.scss"
	import { page } from '$app/stores'
	import PageTransition from '$lib/components/PageTransition.svelte'
	import { fly } from 'svelte/transition';
	/** @type {import('./$types').LayoutData} */
	export let data
</script>

<header>
	<div class="title">
		<img src="https://github.com/joyja.png" alt="James' face">
		<a href="/"><h1 class:small={$page.url.pathname !== '/'}>James Joy's Site</h1></a>
	</div>
	{#if $page.url.pathname === '/' }
		<p in:fly={{ y: -10, duration: 300, delay: 300 }} out:fly={{ y: -10, duration: 300 }} class="subheader">Industrial Automation SME | Professional Electrical Engineer | Developer | 3D Printing Guy</p>
	{/if}
</header>

<main>
	<PageTransition pathname={data.pathname}>
		<slot />
	</PageTransition>
</main>

<footer>
	<p>
		Copyright &#169; <a href="https://github.com/joyja">James A. Joy</a>, {new Date().getFullYear()}
	</p>
</footer>

<style lang="scss">
	:global(:root) {
		--color-background: white;
		--color-text-primary: #212121;
		--color-text-secondary: #5a5a5a;
	}

	:global(body) {
		margin: 0 auto;
		max-width: 75ch;
		font-family: 'Open Sans';
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		background-color: var(--color-background);
		color: var(--color-text-primary);
		padding-left: calc(var(--spacing-unit)*3);
		padding-right: calc(var(--spacing-unit)*3);
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-family: 'Kelly Slab', sans-serif
	}

	:global(a, a:visited, a:active) {
		text-decoration: none;
		color: var(--color-text-primary);
		font-weight: 700;
	}

	:global(a:hover) {
		text-decoration: underline;
	}

	.small {
		font-size: 1.6rem;
	}

	header {
		padding-bottom: calc(	var(--spacing-unit) * 8);
	}

	.title {
		padding-top: calc(var(--spacing-unit) * 8);
		display: flex;
		align-items: center;
		overflow: hidden;
		& > img {
			border-radius: 9999px;
			height: 60px;
			width: 60px;
			margin-right: calc(var(--spacing-unit) * 3);
		}
		& > a > h1 {
			transition: all .3s ease-out;
		}
	}

	main {
		position: relative;
		flex-grow: 1;
	}

	footer {
		margin-top: calc(var(--spacing-unit) * 8);
		text-align: center;
	}
</style>
