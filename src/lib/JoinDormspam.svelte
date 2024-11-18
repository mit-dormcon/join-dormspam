<script lang="ts">
	import { dormspamLists, prefix, type Dorm, commonDormspamList, ListType } from '$lib/data';
	import { getContext } from 'svelte';
	import Error from './Error.svelte';
	import Loading from './Loading.svelte';
	import { addUserToList, delUserFromList } from './moira';
	import type { MoiraException } from './types';
	import type { Readable } from 'svelte/store';
	import HowToDormspam from './HowToDormspam.svelte';
	import MailmanJoin from './MailmanJoin.svelte';

	const ticket = getContext<Readable<string>>('ticket');
	const username = getContext<Readable<string>>('username');

	interface Props {
		lists: string[];
	}

	let { lists }: Props = $props();

	// TODO: for testing purposes, remove
	// lists = [...lists, 'gsc-clearance-hms-new-vassar'];

	function getDorm(lists: string[]): Dorm | null {
		const tapAccessLists = lists.filter((name) => name.startsWith('gsc-clearance-'));
		for (const [tapAccessSuffix, dormlist] of dormspamLists.entries()) {
			const tapAccessList = prefix + tapAccessSuffix;
			if (tapAccessLists.includes(tapAccessList)) {
				return dormlist;
			}
		}
		return null;
	}

	let dormInfo: Dorm | null = $derived(getDorm(lists));
	let correspondingDormspamList = $derived(dormInfo ? dormInfo.listName : '');
	let checkedTOC = $state(false);

	function isInList(listName: string): boolean {
		return lists.includes(listName);
	}

	/// Allow showing content depending on the operation
	enum Operation {
		add,
		remove,
		none
	}
	let currentOperation: Operation = $state(Operation.none);
	let currentPromise: null | Promise<'success' | MoiraException> = $state(null);

	/// Define the operations
	function subscribe(listName: string) {
		currentOperation = Operation.add;
		currentPromise = addUserToList($ticket, listName, $username);
	}
	function unsubscribe(listName: string) {
		currentOperation = Operation.remove;
		currentPromise = delUserFromList($ticket, listName, $username);
	}

	function getSubscribedDormspamLists(lists: string[]) {
		const listsSet = new Set(lists);
		const subscribedDormspamLists: string[] = [];
		const dormspamListNames = [...dormspamLists.values()].map((dorm) => dorm.listName);
		for (const listName of dormspamListNames) {
			if (listsSet.has(listName)) {
				subscribedDormspamLists.push(listName);
			}
		}
		return subscribedDormspamLists;
	}

	let subscribedDormspamLists = $derived(getSubscribedDormspamLists(lists));
	let subscribedDormspamListsOtherDorms = $derived(
		subscribedDormspamLists.filter((name) => name !== correspondingDormspamList)
	);
</script>

{#if currentOperation === Operation.none}
	{#if subscribedDormspamListsOtherDorms.length > 0}
		<p class="notice">
			<strong>NOTE:</strong> You are already in the dormspam lists of
			{#if subscribedDormspamListsOtherDorms.length === 1}
				another dorm:
			{:else}
				other dorms:
			{/if}
			{#each subscribedDormspamLists as list, i}
				<code>{list}</code>{#if i < subscribedDormspamListsOtherDorms.length - 1},
				{/if}
			{/each}. You can unsubscribe from them using
			<a href="https://groups.mit.edu/webmoira/">WebMoira</a>. Everything that follows below is
			about subscribing or unsubscribing to your own dorm's dormspam list, since this application is
			mostly designed for people who are joining dormspam for the first time.
		</p>
	{/if}

	{#if dormInfo}
		{#if dormInfo.listType === ListType.mailman}
			<MailmanJoin {dormInfo} />
		{:else if isInList(dormInfo.listName)}
			<p>
				You are in <strong>{dormInfo.friendlyName}</strong>, and you are already subscribed to
				<code>{dormInfo.listName}</code>.
			</p>
			<HowToDormspam {dormInfo} />
			<button id="unsubscribe" onclick={() => unsubscribe(dormInfo!.listName)}>
				Unsubscribe me
			</button>
		{:else}
			<p>
				Since you are in <strong>{dormInfo.friendlyName}</strong>, to be on dormspam, you should
				subscribe to <code>{dormInfo.listName}</code>.
			</p>
			<form>
				<p>
					<label for="dormspam-toc">
						<input
							type="checkbox"
							id="dormspam-toc"
							name="dormspam-toc"
							bind:checked={checkedTOC}
						/>
						I have read the dormspam FAQ above. I consent to receiving emails from
						{dormInfo.listName}.
					</label>
				</p>
				<button id="subscribe" disabled={!checkedTOC} onclick={() => subscribe(dormInfo.listName)}>
					Subscribe me to {dormInfo.listName}
				</button>
			</form>
		{/if}
	{:else}
		<!-- TODO: do we really need this separate branch? -->
		<p>
			We could not detect what dorm you are in. We can subscribe you to <code
				>random-hall-dormspam</code
			>, which is open to everyone, whether you are in a dorm or not. <!--If you are on a fraternity, consider
            asking your frat leadership to add you to <code>frat-chat</code>.-->
		</p>
		<!-- TODO: can DRY out the subscribe or unsubscribe button to prevent this code repetition -->
		{#if isInList(commonDormspamList)}
			<p>You are already subscribed, though. Do you want to unsubscribe?</p>
			<button id="unsubscribe" onclick={() => unsubscribe(commonDormspamList)}>
				Unsubscribe me from dormspam...
			</button>
		{:else}
			<form>
				<p>
					<label for="dormspam-toc">
						<input
							type="checkbox"
							id="dormspam-toc"
							name="dormspam-toc"
							bind:checked={checkedTOC}
						/>
						I have read the dormspam FAQ above. I consent to receiving emails from dormspam.
					</label>
				</p>
				<button id="subscribe" disabled={!checkedTOC} onclick={() => subscribe(commonDormspamList)}>
					Subscribe me to dormspam!
				</button>
			</form>
		{/if}
	{/if}
{:else}
	{#await currentPromise}
		<p>Asking Moira to do the thing...</p>
		<Loading />
	{:then}
		{#if currentOperation === Operation.add}
			<p>
				🎉 Successfully subscribed to
				<!-- Right now, dormspam-catch-all is a sublist of random-hall-dormspam so we want to 
                         report the name of the parent list to users. -->
				{correspondingDormspamList === commonDormspamList
					? 'random-hall-dormspam'
					: correspondingDormspamList}.
			</p>
			<HowToDormspam {dormInfo} />
		{:else if currentOperation === Operation.remove}
			<p>
				😥 Sorry to see you go. You have been unsuccessfully unsubscribed from
				<!-- TODO dry this logic - trying to @const was leading to a strange error and im eepy -->
				{correspondingDormspamList === commonDormspamList
					? 'random-hall-dormspam'
					: correspondingDormspamList}.
			</p>
			<button id="subscribe" onclick={() => subscribe(correspondingDormspamList)}
				>I changed my mind, please re-subscribe me</button
			>
		{/if}
	{:catch error}
		<Error {error} />
	{/await}
{/if}

<style>
	/* TODO: do a better color for both light and dark theme */
	#unsubscribe {
		background-color: mediumvioletred;
	}
</style>
