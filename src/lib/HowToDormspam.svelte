<script lang="ts">
	import { commonDormspamList, type Dorm } from "$lib/data";

    export let dormInfo: Dorm | null;
</script>

<p>
    <strong>Important info:</strong> Please read or bookmark
    <a href="https://how-to-dormspam.mit.edu/">how-to-dormspam.mit.edu</a> for instructions
    on how to send emails to everyone on dormspam.
    This is the <strong>only way</strong> to correctly dormspam.
</p>
{#if dormInfo && dormInfo.listName != commonDormspamList}
    <p>
        If you only want to email {dormInfo.friendlyName} residents, simply email {dormInfo.listName}@mit.edu 
        as normal without needing to follow the instructions. This isn't called "dormspamming".
    </p>
{/if}
