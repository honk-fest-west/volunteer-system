<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount, getContext } from 'svelte';
  import MainContainer from '$components/MainContainer.svelte';
  import Header from '$components/header/Header.svelte';
  import Actions from '$components/event/Actions.svelte';
  import StatusSelector from '$components/event/status/StatusSelector.svelte';
  import Errors from '$components/event/Errors.svelte';
  import Details from '$components/event/Details.svelte';
  import DetailsForm from '$components/event/form/DetailsForm.svelte';
  import EventSchedule from '$components/schedule/EventSchedule.svelte';
  import BackButton from '$components/header/BackButton.svelte';
  import AutoSave from '$components/event/form/AutoSave.svelte';
  import JobsForm from '$components/event/form/JobsForm.svelte';
  import ConfirmationModal from '$components/event/form/ConfirmationModal.svelte';
  export let params: { id?: string } = {};

  const { state, send } = getContext('eventMachine');

  $: selectedEvent = $state.context.selectedEvent;
  $: error = $state.context.error;
  $: signUps = $state.context.signUps;
  $: confirmingArchiveStatus = $state.matches('confirmingArchiveEvent');
  $: confirmOpenStatus = $state.matches('confirmingOpenEvent');
  $: autoSave = $state.context.autoSaveRef;
  $: status = $state.context.selectedEvent?.status;

  onMount(() => send('AT.EVENT', { data: { eventId: params.id } }));

  function handleStatusChange(event) {
    if (event.detail === 'draft') {
      send('STATUS.SET_DRAFT');
    } else if (event.detail === 'preview') {
      send('STATUS.SET_PREVIEW');
    } else if (event.detail === 'open') {
      send('STATUS.SET_OPEN');
    } else if (event.detail === 'lock') {
      send('STATUS.SET_LOCK');
    } else if (event.detail === 'archive') {
      send('STATUS.SET_ARCHIVE');
    }
  }

  function updateEvent() {
    send('EVENT.SAVE');
  }

  function duplicateEvent() {
    send('EVENT.DUPLICATE');
  }

  function addJob() {
    send('EVENT.ADD_JOB');
  }

  function removeJob(e) {
    send('EVENT.REMOVE_JOB', { data: e.detail });
  }

  function addShift(e) {
    send('EVENT.ADD_SHIFT', { data: e.detail });
  }

  function removeShift(e) {
    send('EVENT.REMOVE_SHIFT', { data: e.detail });
  }

  function gotoIndex() {
    send('GOTO.INDEX');
  }
</script>

{#if selectedEvent}
  <div in:fade={{ duration: 100 }}>
    <MainContainer>
      <div slot="header">
        <Header name={selectedEvent.name}>
          <BackButton slot="left" on:goBack={gotoIndex} />
        </Header>
      </div>

      <div slot="actions">
        <div class="flex items-center">
          {#if status === 'draft'}
            <AutoSave {autoSave} />
          {/if}
          <Actions on:duplicate={duplicateEvent} />
        </div>
      </div>

      {#if status === 'draft'}
        <div
          on:input={updateEvent}
          class="bg-white space-y-6 divide-y divide-gray-200"
        >
          <StatusSelector {status} on:changeStatus={handleStatusChange} />
          <Errors {error} />
          <DetailsForm bind:selectedEvent />
          <JobsForm
            bind:selectedEvent
            on:addjob={addJob}
            on:removejob={removeJob}
            on:addshift={addShift}
            on:removeshift={removeShift}
          />
        </div>
      {:else}
        {#key status}
          <div class="bg-white space-y-6 divide-y divide-gray-200">
            <StatusSelector {status} on:changeStatus={handleStatusChange} />
            <Errors {error} />
            <Details name={selectedEvent.name} date={selectedEvent.date} />
            <EventSchedule {selectedEvent} {signUps} />
          </div>
        {/key}
      {/if}
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
