<!-- @component
This component displays a moira error with a
friendly error message
-->

<script lang="ts">
	import type { MoiraException } from '$lib/types';

	export let noResultsError: string = 'There is nothing here.';
	export let error: MoiraException;
</script>

{#if error.name === 'MR_PERM'}
	<p>Permission denied :(</p>
{:else if error.name === 'MR_NO_MATCH'}
	<p>{noResultsError}</p>
{:else}
	<!-- if we want this dynamic (h2, h3, etc), can use svelte:element -->
	<!-- but we probably want custom css anyway -->
	<h3>An error ({error.name}) occurred</h3>
	<p>{error.message}</p>
{/if}
