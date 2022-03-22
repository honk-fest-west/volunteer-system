<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { VEvent } from '$models';

  import MainContainer from '$components/MainContainer.svelte';
  import EventTable from '$components/event/table/EventTable.svelte';
  import { getContext, onMount } from 'svelte';

  const { state, send } = getContext('shiftMachine');
  $: events = ($state.context?.events as VEvent[]) || [];

  onMount(() => {
    send('INDEX.AT');
  });

  function showEvent(e) {
    send('INDEX.GOTO_SHOW', { data: e.detail });
  }
</script>

<div in:fade={{ duration: 100 }}>
  <MainContainer>
    <h1 slot="header" class="text-3xl font-extrabold text-pink-700 grow">
      Select an Event >>
    </h1>

    <EventTable {events} on:select={showEvent} />
  </MainContainer>
</div>
