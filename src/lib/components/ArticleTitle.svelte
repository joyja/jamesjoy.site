<script lang="ts">
	export let slug = ''
	export let title: string
	export let center = false

	const id = title
		.toLowerCase()
		.replace(/[^a-zA-Z ]/g, '')
		.replace(/\s/g, '-');

	const href = slug ? `/posts/${slug}` : '#' + id;
</script>

{#if slug}
	<h3 class="heading" class:large={!slug} style:text-align={center ? 'center' : 'left'} {id} >
		<a {href}>
			{title}
		</a>
	</h3>
{:else}
	<h1 class="heading" class:large={!slug} style:text-align={center ? 'center' : 'left'} {id}>
		<a {href}>
			{title}
		</a>
	</h1>
{/if}

<style>
	h1 {
		margin: 0;
	}

	.heading {
		margin: 0;
		font-size: 1.8rem;
	}

	.large {
		font-size: 2.2rem;
	}
</style>
