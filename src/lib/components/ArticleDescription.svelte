<script lang="ts">
	export let description: string
	export let slug = ''
	export let center = false

	const href = slug && `/posts/${slug}`
</script>

<p style:text-align={center ? 'center' : 'left'}>
	{description}
</p>

<style>
	p {
		margin: 0;
	}
</style>
