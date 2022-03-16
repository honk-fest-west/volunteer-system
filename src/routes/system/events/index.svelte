<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { VEvent } from '$models';

  import MainContainer from '$components/MainContainer.svelte';
  import EventTable from '$components/event/table/EventTable.svelte';
  import { useEventIndex } from '$machines/event';

  const { state, send } = useEventIndex();
  $: events = Object.values($state.context.events) as VEvent[];

  function selectEvent(e) {
    send('SELECT_EVENT', { data: e.detail });
  }
</script>

<div in:fade={{ duration: 100 }}>
  <MainContainer>
    <h1 slot="header" class="text-3xl font-extrabold text-pink-700 grow">
      Events
    </h1>
    <button
      slot="actions"
      type="button"
      on:click={() => send('ADD_EVENT')}
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span class="material-icons mr-1"> add </span>
      New Event
    </button>
    <EventTable {events} on:select={selectEvent} />
  </MainContainer>
</div>
