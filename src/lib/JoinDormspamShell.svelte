<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import Loading from '$lib/Loading.svelte';
	import { getLists } from '$lib/moira';
	import JoinDormspam from './JoinDormspam.svelte';

	const ticket = getContext<Readable<string>>('ticket');
	const username = getContext<Readable<string>>('username');

	const listsPromise = getLists($ticket, $username);
</script>

{#await listsPromise}
	<p>Getting information from Moira...</p>
	<p>
		<Loading />
	</p>
{:then lists}
	<JoinDormspam {lists} />
{/await}
