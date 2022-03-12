<script lang="ts">
	export let error;
</script>

{#if error}
	<div class="bg-red-100 text-red-700 p-3">
		{error}
	</div>
{/if}
