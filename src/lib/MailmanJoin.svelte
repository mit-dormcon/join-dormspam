<script lang="ts">
	import { type Dorm } from '$lib/data';
	import Error from './Error.svelte';
	import Loading from './Loading.svelte';
	import type { MoiraException } from './types';
	import { mailmanAutoSubscribe, mailmanRequiresApproval } from './data';
	import HowToDormspam from './HowToDormspam.svelte';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { requestSubscription } from './mailman';

	interface Props {
		dormInfo: Dorm;
	}

	let { dormInfo }: Props = $props();
	let mailmanLink = $derived('https://mailman.mit.edu/mailman/listinfo/' + dormInfo.listName);

	const emailTicket = getContext<Readable<string>>('emailTicket');

	let currentPromise: null | Promise<'success' | MoiraException> = $state(null);
	function subscribe(listName: string) {
		currentPromise = requestSubscription($emailTicket, listName);
	}

	let mailmanConfirmation: boolean = $state(false);
</script>

{#if currentPromise === null}
	<p>
		You are in <strong>{dormInfo.friendlyName}</strong>. Click the button below to subscribe to
		dormspam:
	</p>
	<button id="subscribe" onclick={() => subscribe(dormInfo.listName)}>
		Subscribe me to {dormInfo.listName}
	</button>
{:else}
	{#await currentPromise}
		<p>Sending email to Mailman...</p>
		<Loading />
	{:then}
		{#if mailmanAutoSubscribe.includes(dormInfo.listName)}
			<p>🎉 Successfully subscribed to {dormInfo.listName}!</p>
			<HowToDormspam {dormInfo} />
		{:else if mailmanRequiresApproval.includes(dormInfo.listName)}
			<p>
				🎉 You are almost subscribed to {dormInfo.listName}! Your request will be reviewed by the {dormInfo.friendlyName}
				exec.
			</p>
			<HowToDormspam {dormInfo} />
		{:else if mailmanConfirmation}
			<HowToDormspam {dormInfo} />
		{:else}
			<p>
				Almost done! You will receive an email from {dormInfo.listName}-request@mit.edu with a
				subject that begins with "confirm". Please click on the link inside it.
				<strong>You are not subscribed yet until you confirm your subscription.</strong>
			</p>
			<p>
				<label>
					<input type="checkbox" bind:checked={mailmanConfirmation} />
					I have finalized my subscription by following the instructions in my email.
				</label>
			</p>
		{/if}
	{:catch error}
		<Error {error} />
	{/await}
{/if}
<hr />
<p>
	You can also email {dormInfo.listName}-owner@mit.edu with any questions (such as help subscribing
	or unsubscribing). The website <a href={mailmanLink} target="_blank">{mailmanLink}</a> should also
	let you subscribe or unsubscribe directly.
</p>
