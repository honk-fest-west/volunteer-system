<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TableCell from '$components/table/TableCell.svelte';
  import { formatDate } from '$util';
  export let event;

  const dispatch = createEventDispatcher();

  function selectEvent() {
    dispatch('select', event.id);
  }
</script>

<TableCell text="left">
  <button class="text-indigo-500 hover:text-indigo-700" on:click={selectEvent}>
    <div class:hidden={!event.name} class="text-sm font-medium ">
      {event.name}
    </div>
  </button>
</TableCell>
<TableCell text="right">
  <div class:hidden={!event.date} class="text-sm text-gray-500">
    {formatDate(event.date)}
  </div>
</TableCell>
<TableCell>
  {#if event.status === 'draft'}
    <span
      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
    >
      Draft
    </span>
  {:else if event.status === 'preview'}
    <span
      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800"
    >
      Preview
    </span>
  {:else if event.status === 'open'}
    <span
      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
    >
      Open
    </span>
  {:else if event.status === 'lock'}
    <span
      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
    >
      Locked
    </span>
  {:else if event.status === 'archive'}
    <span
      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800"
    >
      Archived
    </span>
  {/if}
</TableCell>
