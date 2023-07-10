<script lang="ts">
	export let date: string
	export let center = false

	const formattedDate = new Date(date).toDateString()
</script>

<p style:text-align={center ? 'center' : 'left'}>
	<span class="date">{formattedDate}</span>
</p>

<style>
  p {
    margin: 0;
    margin-bottom: calc(var(--spacing-unit) * 4);
  }

	.date {
		color: var(--color-text-secondary);
	}
</style>
