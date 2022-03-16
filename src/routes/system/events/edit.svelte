<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { useEventEdit } from '$machines/event';
  import ConfirmationModal from '$components/event/form/ConfirmationModal.svelte';
  import MainContainer from '$components/MainContainer.svelte';
  import Header from '$components/event/Header.svelte';
  import Actions from '$components/event/Actions.svelte';
  import StatusSelector from '$components/event/status/StatusSelector.svelte';
  import Details from '$components/event/form/DetailsForm.svelte';
  import Jobs from '$components/event/form/JobsForm.svelte';
  import Errors from '$components/event/Errors.svelte';
  import AutoSave from '$components/event/form/AutoSave.svelte';
  export let params: { id?: string } = {};

  const { state, send } = useEventEdit();

  $: selectedEvent = $state.context.selectedEvent;
  $: error = $state.context.error;
  $: confirmOpenStatus = $state.matches('validatingEvent');
  $: autoSave = $state.context.autoSaveRef;

  onMount(() => send('EDIT_EVENT', { data: { eventId: params.id } }));

  function updateEvent(e) {
    send('UPDATE_EVENT');
  }

  function handleStatusChange(event) {
    if (event.detail === 'open') {
      send('PUBLISH_EVENT');
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
          <AutoSave {autoSave} />
          <Actions {state} {send} {selectedEvent} />
        </div>
      </div>
      <div
        on:input={updateEvent}
        class="bg-white space-y-6 divide-y divide-gray-200"
      >
        <StatusSelector
          status={selectedEvent.status}
          on:changeStatus={handleStatusChange}
        />
        <Errors {error} />
        <Details bind:selectedEvent />
        <Jobs bind:selectedEvent {send} />
      </div>
    </MainContainer>
  </div>
{/if}

{#if confirmOpenStatus}
  <ConfirmationModal {send}>
    <span slot="title" class="title">Open Event</span>
    Opening an event makes it avaliable for volunteers to sign up for shifts.
    <span class="font-semibold"
      >This event can not be edited once it is opened.</span
    >
    Please confirm everything is correct.
  </ConfirmationModal>
{/if}
