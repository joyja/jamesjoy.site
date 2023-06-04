<div class="page">
	<h1>
		<span class="errorCode">404</span>
	</h1>
	<p class="errorMessage">Page Not Found</p>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		height: 100%;
		width: 100%;
		& > h1 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-weight: 400;
			font-size: var(--text-9xl);
			line-height: var(--text-9xl-lh);
		}
	}

	.errorMessage {
		text-align: center;
		font-size: 1rem;
	}
</style>
