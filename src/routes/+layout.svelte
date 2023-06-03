<script lang="ts">
	import '@fontsource/kelly-slab'
	import '@fontsource/open-sans'
	import "../css/index.scss"
	import { page } from '$app/stores'
</script>

<header>
	<img src="https://github.com/joyja.png" alt="James' face">
	<a href="/"><h1 class:small={$page.url.pathname !== '/'}>James Joy's Site</h1></a>
</header>

<main>
	<slot />
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
		padding: calc(var(--spacing-unit) * 8);
		font-family: 'Open Sans';
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		background-color: var(--color-background);
		color: var(--color-text-primary);
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
		display: flex;
		align-items: center;
		overflow: hidden;
		& > img {
			border-radius: 9999px;
			height: 60px;
			width: 60px;
			margin-right: calc(var(--spacing-unit) * 3);
		}
	}

	main {
		flex-grow: 1;
	}

	footer {
		margin-top: calc(var(--spacing-unit) * 8);
		text-align: center;
	}
</style>
