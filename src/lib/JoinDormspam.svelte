<script lang="ts">
    import { getContext } from 'svelte';
    import type { Readable } from 'svelte/store';
    import Loading from '$lib/Loading.svelte';
	import { getLists } from '$lib/moira';

    const ticket = getContext<Readable<string>>('ticket');
    const username = getContext<Readable<string>>('username');

    const listsPromise = getLists($ticket);

    function getDormTapAccessLists(lists: string[]) {
        return lists.filter((name) => name.startsWith("gsc-clearance-hms-"));
    }
</script>

{#await listsPromise}
    <p>
        <Loading/>
    </p>
{:then lists} 
    {@const tapAccessLists = getDormTapAccessLists(lists)}
    <ul>
        {#each tapAccessLists as list}
            <li>{list}</li>
        {:else}
            <li>Crickets</li>
        {/each}
    </ul>
{/await}

