<script lang="ts">
	import { commonDormspamList, type Dorm } from "$lib/data";

    export let dormInfo: Dorm | null;
</script>

<p>
    Please note that if you want to send an email to everyone on dormspam you <strong>have to</strong> follow
    the rules on <a href="https://how-to-dormspam.mit.edu/">how-to-dormspam.mit.edu</a>. Otherwise, <em>bad
    things will happen</em>.
</p>
{#if dormInfo && dormInfo.listName != commonDormspamList}
    <p>
        If you only want to email {dormInfo.friendlyName} residents, simply email {dormInfo.listName}@mit.edu 
        as normal.
    </p>
{/if}
