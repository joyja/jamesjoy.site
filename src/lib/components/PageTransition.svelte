<script>
	import { fly } from 'svelte/transition'
	import { page } from '$app/stores'
	export let pathname = ''
</script>

{#key pathname}
	<div
		class:transitor={$page.url.pathname === '/'}
		class:transitorpost={$page.url.pathname !== '/'} 
		in:fly={{ x: -10, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}
	>
		<slot />
	</div>
{/key}

<style lang="scss">
@media (min-width: 0px) {
  .transitor {
		padding-top: 12rem;
	}
	.transitorpost {
		padding-top: 8rem;
	}
}
@media (min-width: 768px) {
  .transitor {
		padding-top: 10rem;
	}
	.transitorpost {
		padding-top: 8rem;
	}
}
.transitor {
	// padding-top: 10rem;
	transition: padding-top .3s ease-out;
	position: relative;
	// flex-grow: 1;
}
.transitorpost {
	// padding-top: 10rem;
	transition: padding-top .3s ease-out;
	position: relative;
	// flex-grow: 1;
}
</style>