<script lang="ts">
  import { fade } from 'svelte/transition';
  import { getContext, onMount } from 'svelte';
  import type { VEvent } from '$models';

  import MainContainer from '$components/MainContainer.svelte';
  import TableContainer from '$components/table/TableContainer.svelte';
  import TableHead from '$components/table/TableHead.svelte';
  import TableRow from '$components/table/TableRow.svelte';
  import EventRow from '$components/event/table/EventRow.svelte';

  const { state, send } = getContext('eventMachine');
  $: events = Object.values($state.context.events).sort(
    (a: VEvent, b: VEvent) => a.compareTo(b)
  ) as VEvent[];

  function selectEvent(e) {
    send('EVENT.SELECT', { data: e.detail });
  }

  function addEvent() {
    send('EVENT.ADD');
  }

  onMount(() => {
    send('AT.INDEX');
  });
</script>

<div in:fade={{ duration: 100 }}>
  <MainContainer>
    <h1 slot="header" class="text-3xl font-extrabold text-pink-700 grow">
      Events
    </h1>
    <button
      slot="actions"
      type="button"
      on:click={addEvent}
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span class="material-icons mr-1 !text-lg"> add </span>
      New Event
    </button>
    <TableContainer>
      <TableRow slot="head">
        <TableHead side="left" text="left">Name</TableHead>
        <TableHead text="right">Date</TableHead>
        <TableHead side="right">Status</TableHead>
      </TableRow>
      {#each events as event}
        <TableRow>
          <EventRow on:select={selectEvent} {event} />
        </TableRow>
      {/each}
    </TableContainer>
  </MainContainer>
</div>
