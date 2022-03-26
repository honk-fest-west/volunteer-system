<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { VEvent } from '$models';

  import MainContainer from '$components/MainContainer.svelte';
  import EventTable from '$components/event/table/EventTable.svelte';
  import { getContext, onMount } from 'svelte';
  import TableContainer from '$components/table/TableContainer.svelte';
  import TableRow from '$components/table/TableRow.svelte';
  import TableHead from '$components/table/TableHead.svelte';
  import EventRow from '$components/event/table/EventRow.svelte';

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

    <TableContainer>
      <TableRow slot="head">
        <TableHead side="left" text="left">Name</TableHead>
        <TableHead text="right">Date</TableHead>
        <TableHead side="right">Status</TableHead>
      </TableRow>
      {#each events as event}
        <TableRow>
          <EventRow on:select={showEvent} {event} />
        </TableRow>
      {/each}
    </TableContainer>
  </MainContainer>
</div>
