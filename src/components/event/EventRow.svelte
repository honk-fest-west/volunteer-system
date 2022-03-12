<script lang="ts">
  import { useEvents } from '$machines/event';
  import { push } from 'svelte-spa-router';
  export let event;

  const { send } = useEvents();

  function selectEvent() {
    send('SELECT_EVENT', { data: event });
  }

  function duplicateEvent() {
    send('DUPLICATE_EVENT', { data: event });
  }
</script>

<tr>
  <td
    class="px-6 py-4 whitespace-nowrap cursor-pointer text-indigo-500 hover:text-indigo-700"
    on:click={selectEvent}
  >
    <div class:hidden={!event.name} class="text-sm font-medium ">
      {event.name}
    </div>
  </td>
  <td class="px-6 py-4 whitespace-nowrap text-right">
    <div class:hidden={!event.date} class="text-sm text-gray-500">
      {event.date}
    </div>
  </td>
  <td class="px-6 py-4 whitespace-nowrap text-center">
    {#if event.status === 'draft'}
      <span
        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
      >
        Draft
      </span>
    {:else if event.status === 'open'}
      <span
        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
      >
        Open
      </span>
    {:else if event.status === 'locked'}
      <span
        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
      >
        Locked
      </span>
    {:else if event.status === 'archived'}
      <span
        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800"
      >
        Archived
      </span>
    {/if}
  </td>
  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
    <button
      on:click={duplicateEvent}
      type="button"
      class="text-gray-500 hover:text-gray-700"
      role="menuitem"
      tabindex="-1"
      id="options-menu-item-0"
    >
      <span class="material-icons mr-2"> content_copy </span>
    </button>
  </td>
</tr>
