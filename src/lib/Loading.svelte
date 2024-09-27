<div class="flex">
	<div class="loader"></div>
</div>

<style>
	.flex {
		display: flex;
		width: 100%;
		justify-content: center;
	}
	.loader {
		border: 16px solid var(--accent-bg); /* Light grey */
		border-top: 16px solid var(--accent); /* Blue */
		border-radius: 50%;
		width: 120px;
		height: 120px;
		animation: spin 2s linear infinite;
		align-self: center;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
