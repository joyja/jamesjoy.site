<article>
	<slot />
</article>

<style>
	article {
		margin-bottom: calc(var(--spacing-unit) * 3);
		border: solid 1px var(--gray-300);
		border-radius: var(--rounded-md);
		padding: calc(var(--spacing-unit) * 3);
		box-shadow: var(--shadow-md);
	}
</style>
