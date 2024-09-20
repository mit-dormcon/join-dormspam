<script lang="ts">
    import { dormspamLists, prefix, type Dorm, commonDormspamList, ListType } from "$lib/data";

    export let lists: string[];

    // TODO: for testing purposes, remove
    $: lists = [...lists, "gsc-clearance-hms-next-house"];

    function getDorm(lists: string[]): Dorm | null {
        const tapAccessLists = lists.filter((name) => name.startsWith("gsc-clearance-"));
        for (const [tapAccessSuffix, dormlist] of dormspamLists.entries()) {
            const tapAccessList = prefix + tapAccessSuffix;
            if (tapAccessLists.includes(tapAccessList)) {
                return dormlist;
            }
        }
        return null;
    }

    let dormInfo: Dorm | null = getDorm(lists);
    $: dormInfo = getDorm(lists);

    let correspondingDormspamList = commonDormspamList;
    $: {
        if (dormInfo) {
            correspondingDormspamList = dormInfo.listName;
        }
    }

    function isInList(listName: string): boolean {
        return lists.includes(listName);
    }

    function getMailmanLink(listName: string): string {
        return "https://mailman.mit.edu/mailman/listinfo/" + listName;
    }
</script>

{#if dormInfo}
    {#if dormInfo.listType === ListType.mailman}
    <!-- TODO: first pass at mailman. it can be better. iframe? redirect? guided screenshots? using admin password? etc -->
        <p>
            You are in <strong>{dormInfo.friendlyName}</strong>. To subscribe or unsubscribe from
            dormspam, please go to <a href="{getMailmanLink(dormInfo.listName)}">{dormInfo.listName}.</a>
        </p>
    {:else}
        {#if isInList(dormInfo.listName)}
            <p>
                You are in <strong>{dormInfo.friendlyName}</strong>, and you are already
                subscribed to <code>{dormInfo.listName}</code>.
            </p>
            THE BUTTON DOESNT WORK YET<br/>
            <button id="unsubscribe">Unsubscribe me</button>
        {:else}
            <p>
                Since you are in <strong>{dormInfo.friendlyName}</strong>, to be on dormspam,
                you should subscribe to <code>{dormInfo.listName}</code>.
            </p>
            THE BUTTON DOESNT WORK YET<br/>
            <button id="subscribe">Subscribe me to {dormInfo.listName}</button>
        {/if}
    {/if}
{:else}
    <p>
        We could not detect what dorm you are in. We can subscribe you to <code>{commonDormspamList}</code>
    </p>
{/if}