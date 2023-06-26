<script>
	import { fly } from 'svelte/transition'
	import { page } from '$app/stores'
	export let pathname = ''
</script>

{#key pathname}
	<main
		class:transitor={$page.url.pathname === '/'}
		class:transitorpost={$page.url.pathname !== '/'} 
		in:fly={{ x: -10, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}
	>
		<slot />
</main>
{/key}

<style lang="scss">
main {
	display: flex;
	flex-direction: column;
}
@media (min-width: 0px) {
  .transitor {
		margin-top: 12rem;
	}
	.transitorpost {
		margin-top: 8rem;
	}
}
@media (min-width: 768px) {
  .transitor {
		margin-top: 10rem;
	}
	.transitorpost {
		margin-top: 8rem;
	}
}
.transitor {
	flex-grow: 1;
	transition: margin-top .3s ease-out;
	position: relative;
}
.transitorpost {
	flex-grow: 1;
	transition: padding-top .3s ease-out;
	position: relative;
}
</style>