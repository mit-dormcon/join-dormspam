<script lang="ts">
	import '$lib/simple.css';
	import { setContext } from 'svelte';
	import { encodeEmailTicket, encodeMoiraTicket, getUsername, loginWebathena } from '$lib/webathena';
	import { derived, writable } from 'svelte/store';
	import AboutDormspam from '$lib/AboutDormspam.svelte';
	import JoinDormspamShell from '$lib/JoinDormspamShell.svelte';

	const webathena = writable<any>(null);
	setContext('webathena', webathena);

	const ticket = derived(webathena, encodeMoiraTicket);
	setContext('ticket', ticket);

	const emailTicket = derived(webathena, encodeEmailTicket);
	setContext('emailTicket', emailTicket);

	const username = derived(webathena, getUsername);
	setContext('username', username);

	async function login() {
		$webathena = await loginWebathena();
	}

</script>

<svelte:head>
	<title>Join dormspam</title>
</svelte:head>

<AboutDormspam/>

<p></p>

{#if $webathena === null}
    <p>
        <button id="login" on:click={login}>Login with Webathena</button>
    </p>
{:else}
    <JoinDormspamShell/>
{/if}


