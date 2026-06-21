<style>
	#issue-warning {
		background-color: rgb(255, 204, 204);
	}
</style>

<script lang="ts">
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

	import 'simpledotcss/simple.min.css';

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

	<!-- TODO: remove this notice once it is fixed -->
	<div class="notice" id="issue-warning">
		<p>We are aware of issues with this site and we are working to fix them.</p>
		<p>
			For the time being, if you want to join dormspam,
			<strong>please follow the instructions at <a href="https://sites.mit.edu/how-to-dormspam/unsubscribe/">how-to-dormspam.mit.edu</a></strong>.
		</p>
	</div>

	{#if $webathena === null}
		<p>
			<button id="login" onclick={login}>Login with Webathena</button>
		</p>
	{:else}
		<JoinDormspamShell />
	{/if}
</main>

<Footer />
