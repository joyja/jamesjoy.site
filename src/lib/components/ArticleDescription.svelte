<script lang="ts">
	export let description: string
	export let slug = ''

	const href = slug && `/posts/${slug}`
</script>

<p>
	{description}
</p>

<style>
	p {
		display: flex;
		justify-content: space-between;
		margin: 0;
	}
</style>
