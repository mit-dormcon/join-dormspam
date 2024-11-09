<script lang="ts">
	import '$lib/simple.css';
	import { setContext } from 'svelte';
	import {
		encodeEmailTicket,
		encodeMoiraTicket,
		getUsername,
		loginWebathena,
		type WebAthenaSession
	} from '$lib/webathena';
	import { derived, writable } from 'svelte/store';
	import Header from '$lib/Header.svelte';
	import AboutDormspam from '$lib/AboutDormspam.svelte';
	import JoinDormspamShell from '$lib/JoinDormspamShell.svelte';
	import Footer from '$lib/Footer.svelte';

	const webathena = writable<WebAthenaSession[] | null>(null);
	setContext('webathena', webathena);

	const ticket = derived(webathena, encodeMoiraTicket);
	setContext('ticket', ticket);

	const emailTicket = derived(webathena, encodeEmailTicket);
	setContext('emailTicket', emailTicket);

	const username = derived(webathena, getUsername);
	setContext('username', username);

	async function login() {
		$webathena = (await loginWebathena()) as WebAthenaSession[];
	}
</script>

<svelte:head>
	<title>Join dormspam</title>
</svelte:head>

<Header />

<main>
	<AboutDormspam />

	{#if $webathena === null}
		<p>
			<button id="login" onclick={login}>Login with Webathena</button>
		</p>
	{:else}
		<JoinDormspamShell />
	{/if}
</main>

<Footer />
