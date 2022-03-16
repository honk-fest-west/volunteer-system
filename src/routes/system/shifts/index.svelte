<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { VEvent } from '$types';

  import MainContainer from '$components/MainContainer.svelte';
  import EventTable from '$components/event/table/EventTable.svelte';
  import { getContext } from 'svelte';

  const { state, send } = getContext('shiftMachine');

  $: events = $state.context.events as VEvent[];

  function selectEvent(e) {
    send('SELECT_EVENT', { data: e.detail });
  }
</script>

<div in:fade={{ duration: 100 }}>
  <MainContainer>
    <h1 slot="header" class="text-3xl font-extrabold text-pink-700 grow">
      Shifts
    </h1>
    <p>Select an Event below to sign up for shifts</p>
    <EventTable {events} on:select={selectEvent} />
  </MainContainer>
</div>
