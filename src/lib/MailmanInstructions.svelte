<script lang="ts">
    import { type Dorm } from "$lib/data";
	import HowToDormspam from "./HowToDormspam.svelte";

    export let dormInfo: Dorm;

    const requestList = dormInfo.listName+ "-request@mit.edu";

    function getMailmanLink(listName: string): string {
        return "https://mailman.mit.edu/mailman/listinfo/" + listName;
    }

    const mailmanWarning = "Please note that this email is being sent to a bot that ends with -request@mit.edu. NEVER EVER email the actual list with something like subscribe or unsubscribe, because that goes to everyone. This is fine because it ends with -request and is a bot.";
    let mailmanStep1 = false;
    let mailmanStep2 = false;
    $: subscriptionComplete = mailmanStep1 && mailmanStep2;
</script>

{#if subscriptionComplete}
    <p>🎉 Congratulations on subscribing to dormspam via {dormInfo.listName}!</p>
    <HowToDormspam {dormInfo}/>
{:else}
    <p>
        You are in <strong>{dormInfo.friendlyName}</strong>. To subscribe or unsubscribe from
        dormspam, please go to <a href="{getMailmanLink(dormInfo.listName)}" target="_blank">{dormInfo.listName}</a>.
        There are two main steps to join a mailman list:
    </p>

    <p>
        <label>
            <input type="checkbox" bind:checked={mailmanStep1}>
            I have requested a subscription <a href="{getMailmanLink(dormInfo.listName)}" target="_blank">on Mailman</a>
            (leave the password field blank) or on the window below. Alternatively,
            <a target="_blank" href="mailto:{requestList}?subject=subscribe&body={mailmanWarning}">
                I have emailed {dormInfo.listName}<strong>-request</strong>@mit.edu with the subject
                "subscribe" (click to email).
            </a>
        </label>
    </p>

    <p>
        <label>
            <input type="checkbox" bind:checked={mailmanStep2}>
            I have accepted the subscription request I have received from {dormInfo.listName}-request@mit.edu
            by clicking on the link inside it<!-- (or just press the reply button and then the send button)-->
            (it has a subject that starts with <code>confirm</code>).
        </label>
    </p>

    <iframe src="{getMailmanLink(dormInfo.listName)}" title="mailman" width="100%" height="100%"></iframe>
{/if}