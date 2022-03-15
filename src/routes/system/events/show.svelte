<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { useShowEvent } from '$machines/event';
  import MainContainer from '$components/MainContainer.svelte';
  import Header from '$components/event/Header.svelte';
  import Actions from '$components/event/Actions.svelte';
  import StatusSelector from '$components/event/status/StatusSelector.svelte';
  import Errors from '$components/event/Errors.svelte';
  import Details from '$components/event/Details.svelte';
  import Jobs from '$components/event/jobs/Jobs.svelte';

  export let params: { id?: string } = {};

  const { state, send } = useShowEvent();

  $: selectedEvent = $state.context.selectedEvent;
  $: volunteerJobShifts = $state.context.volunteerJobShifts;
  $: error = $state.context.error;
  $: confirmOpenStatus = $state.matches('confirmingUnlockEvent');
  $: confirmLockStatus = $state.matches('confirmingLockEvent');
  $: confirmingArchiveStatus = $state.matches('confirmingArchiveEvent');

  onMount(() => send('SHOW_EVENT', { data: { eventId: params.id } }));

  function handleStatusChange(event) {
    if (event.detail === 'open') {
      send('OPEN_EVENT');
    } else if (event.detail === 'locked') {
      send('LOCK_EVENT');
    } else if (event.detail === 'archived') {
      send('ARCHIVE_EVENT');
    }
  }
</script>

{#if selectedEvent && volunteerJobShifts}
  <div in:fade={{ duration: 100 }}>
    <MainContainer>
      <div slot="header">
        <Header {send} name={selectedEvent.name} />
      </div>
      <div slot="actions">
        <div class="flex items-center">
          <Actions {state} {send} {selectedEvent} />
        </div>
      </div>
      <div class="bg-white space-y-6 divide-y divide-gray-200">
        <StatusSelector
          status={selectedEvent.status}
          on:changeStatus={handleStatusChange}
        />
        <Errors {error} />
        <Details {selectedEvent} />
        <Jobs {selectedEvent} {volunteerJobShifts} {send} />
      </div>
    </MainContainer>
  </div>
{/if}
