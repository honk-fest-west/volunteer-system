<script lang="ts">
  import type { VEvent } from '$types';
  import { fly } from 'svelte/transition';
  export let state;
  export let send;
  export let selectedEvent: VEvent;

  let eventMenuOpen = false;

  function duplicateEvent() {
    send('DUPLICATE_EVENT', { data: selectedEvent });
  }
</script>

<div>
  <button
    class="text-gray-500 hover:text-gray-700 pt-2 pl-2"
    on:click={() => (eventMenuOpen = !eventMenuOpen)}
  >
    <span class="material-icons"> more_vert </span>
  </button>
  {#if eventMenuOpen}
    <div
      class="z-10 w-fit mr-5 origin-top absolute right-0 mt-2 p-2 rounded-md shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 divide-y divide-gray-300 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu-button"
      tabindex="-1"
      on:click={() => (eventMenuOpen = false)}
      on:mouseleave={() => (eventMenuOpen = false)}
      transition:fly={{ y: -10, duration: 200 }}
    >
      <div class="py-1 text-gray-600 hover:text-gray-800" role="none">
        <button
          on:click={duplicateEvent}
          type="button"
          class="text-sm flex items-center"
          role="menuitem"
          tabindex="-1"
          id="options-menu-item-0"
        >
          <span class="material-icons mr-2"> content_copy </span>
          Duplicate
        </button>
      </div>
    </div>
  {/if}
</div>
