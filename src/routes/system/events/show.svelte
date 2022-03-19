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
  import EventSchedule from '$components/event/schedule/EventSchedule.svelte';
  export let params: { id?: string } = {};

  const { state, send } = useShowEvent();

  $: selectedEvent = $state.context.selectedEvent;
  $: error = $state.context.error;
  $: signUps = $state.context.signUps;
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

  function gotoIndex() {
    send('GOTO_INDEX');
  }
</script>

{#if selectedEvent}
  <div in:fade={{ duration: 100 }}>
    <MainContainer>
      <div slot="header">
        <Header on:goBack={gotoIndex} name={selectedEvent.name} />
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
        <Details name={selectedEvent.name} date={selectedEvent.date} />
        <EventSchedule {selectedEvent} {signUps} />
      </div>
    </MainContainer>
  </div>
{/if}
