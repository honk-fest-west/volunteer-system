<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { VEvent } from '$types';

  import MainContainer from '$components/MainContainer.svelte';
  import EventTable from '$components/event/table/EventTable.svelte';
  import { getContext } from 'svelte';

  const { state, send } = getContext('shiftMachine');

  $: events = $state.context.events as VEvent[];

  function showEvent(e) {
    console.log('showEvent', e);
    send('SHOW_EVENT', { data: e.detail.id });
  }
</script>

<div in:fade={{ duration: 100 }}>
  <MainContainer>
    <h1 slot="header" class="text-3xl font-extrabold text-pink-700 grow">
      Shifts
    </h1>
    <p class="mb-4 text-xl">Select an Event</p>
    <EventTable {events} on:select={showEvent} />
  </MainContainer>
</div>
