<script lang="ts">
	import { getTicket, getUsername } from '$lib/context';
	import Loading from '$lib/Loading.svelte';
	import { getLists } from '$lib/moira';
	import JoinDormspam from './JoinDormspam.svelte';

	const ticket = getTicket();
	const username = getUsername();

	const listsPromise = $ticket && $username ? getLists($ticket, $username) : Promise.resolve([]);
</script>

{#await listsPromise}
	<p>Getting information from Moira...</p>
	<p>
		<Loading />
	</p>
{:then lists}
	<JoinDormspam {lists} />
{/await}
