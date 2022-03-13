<script lang="ts">
  import { fade } from 'svelte/transition';
  import { getContext, onMount } from 'svelte';
  import ConfirmationModal from '$components/modals/ConfirmationModal.svelte';
  import MainContainer from '$components/MainContainer.svelte';
  import EventHeader from '$components/event/form/Header.svelte';
  import EventActions from '$components/event/form/EventActions.svelte';
  import EventStatus from '$components/event/form/EventStatus.svelte';
  import EventDetails from '$components/event/form/EventDetails.svelte';
  import EventJobs from '$components/event/form/EventJobs.svelte';
  import EventErrors from '$components/event/form/EventErrors.svelte';
  export let params: { id?: string } = {};

  const { state, send } = getContext('events');

  $: selectedEvent = $state.context.selectedEvent;
  $: error = $state.context.error;
  $: confirmOpenStatus = $state.matches('validatingEvent');
  $: autoSave = $state.context.autoSaveRef;

  onMount(() => send('AT_EDIT', { eventId: params.id }));

  function updateEvent(e) {
    if (e.target.name !== 'status') {
      send('UPDATE_EVENT');
    }
  }
</script>

{#if selectedEvent}
  <div in:fade={{ duration: 100 }}>
    <MainContainer>
      <div slot="header">
        <EventHeader {send} name={selectedEvent.name} />
      </div>
      <div slot="actions">
        <EventActions {state} {send} {selectedEvent} {autoSave} />
      </div>
      <div
        on:input={updateEvent}
        class="bg-white space-y-6 divide-y divide-gray-200"
      >
        <EventStatus bind:selectedEvent {send} />
        <EventErrors {error} />
        <EventDetails bind:selectedEvent />
        <EventJobs bind:selectedEvent {send} />
      </div>
    </MainContainer>
  </div>
{/if}

{#if confirmOpenStatus}
  <ConfirmationModal {send}>
    <span slot="title" class="title">Open Event</span>
    Opening an event makes it avaliable for volunteers to apply for shifts. This
    event can not be edited once it is opened. Please confirm everything is correct.
  </ConfirmationModal>
{/if}
