<script lang="ts">
	import '$lib/simple.css';
	import { setWebathena, setTicket, setEmailToken, setUsername } from '$lib/context';
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
	setWebathena(webathena);

	const ticket = derived(webathena, encodeMoiraTicket);
	setTicket(ticket);

	const emailTicket = derived(webathena, encodeEmailTicket);
	setEmailToken(emailTicket);

	const username = derived(webathena, getUsername);
	setUsername(username);

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
