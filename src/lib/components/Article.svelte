<script lang="ts">
	export let slug=``
	const href = slug && `/posts/${slug}`
</script>

<article>
	<slot />
		<a class="read-more" {href}>Read More 
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
			</svg>
		</a>
</article>

<style lang="scss">
	article {
		position: relative;
		margin-bottom: calc(var(--spacing-unit) * 3);
		border: solid 1px var(--gray-300);
		border-radius: var(--rounded-md);
		padding: calc(var(--spacing-unit) * 3);
		box-shadow: var(--shadow-md);
		transition: transform .3s ease-out;
	}
	article:hover {
		transform: scale(1.05);
	}
	.read-more {
		position: absolute;
		display: flex;
		justify-content: end;
		align-items: center;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		text-align: right;
		opacity: 0;
		transition: opacity .3s ease-out;
		& > svg {
			height: 24px;
			padding-left: calc(var(--spacing-unit) * 1);
			padding-right: calc(var(--spacing-unit) * 3);
		}
	}
	.read-more:hover {
		opacity: 1;
	}
</style>
