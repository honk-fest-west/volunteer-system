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
  import EventSchedule from '$components/event/schedule/EventSchedule.svelte';
  import BackButton from '$components/header/BackButton.svelte';
  import AutoSaveNotification from '$components/AutoSaveNotification.svelte';
  import JobsForm from '$components/event/form/JobsForm.svelte';
  import ConfirmationModal from '$components/event/form/ConfirmationModal.svelte';
  import ScheduleInfo from '$components/event/schedule/info/ScheduleInfo.svelte';
  export let params: { id?: string } = {};

  const { state, send } = getContext('eventMachine');

  $: selectedEvent = $state.context.selectedEvent;
  $: error = $state.context.error;
  $: signUps = $state.context.signUps;
  $: confirmArchiveStatus = $state.matches(
    'viewingEvent.confirmingArchiveEvent'
  );
  $: confirmOpenStatus = $state.matches('viewingEvent.confirmingOpenEvent');
  $: autoSave = $state.context.autoSaveRef;
  $: status = $state.context.selectedEvent?.status;
  $: selectedJobId = $state.context.selectedJobId;
  $: selectedShiftIds = $state.context.selectedShiftIds;
  $: currentPage = $state.context.schedulePage;
  $: allowPrevPage = $state.can('SCHEDULE.PREV_PAGE');
  $: allowNextPage = $state.can('SCHEDULE.NEXT_PAGE');
  $: isDraftDisabled = !$state.can('STATUS.SET_DRAFT');
  $: isPreviewDisabled = !$state.can('STATUS.SET_PREVIEW');
  $: isOpenDisabled = !$state.can('STATUS.SET_OPEN');
  $: isLockDisabled = !$state.can('STATUS.SET_LOCK');
  $: isArchiveDisabled = !$state.can('STATUS.SET_ARCHIVE');

  onMount(() => send('AT.EVENT', { data: params.id }));

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

  function selectJob(e) {
    send('SCHEDULE.SHOW_INFO', { data: e.detail });
  }

  function closeScheduleInfo() {
    send('SCHEDULE.CLOSE_INFO');
  }

  function prevSchedulePage() {
    send('SCHEDULE.PREV_PAGE');
  }

  function nextSchedulePage() {
    send('SCHEDULE.NEXT_PAGE');
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
            <AutoSaveNotification {autoSave} />
          {/if}
          <Actions on:duplicate={duplicateEvent} />
        </div>
      </div>

      {#if status === 'draft'}
        <div
          on:input={updateEvent}
          class="bg-white space-y-6 divide-y divide-gray-200"
        >
          <StatusSelector
            {status}
            {isDraftDisabled}
            {isPreviewDisabled}
            {isOpenDisabled}
            {isLockDisabled}
            {isArchiveDisabled}
            on:changeStatus={handleStatusChange}
          />
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
            <StatusSelector
              {status}
              {isDraftDisabled}
              {isPreviewDisabled}
              {isOpenDisabled}
              {isLockDisabled}
              {isArchiveDisabled}
              on:changeStatus={handleStatusChange}
            />
            <Errors {error} />
            <Details
              name={selectedEvent.name}
              location={selectedEvent.location}
              date={selectedEvent.date}
            />
            {#key signUps}
              <EventSchedule
                {selectedEvent}
                {signUps}
                {allowNextPage}
                {allowPrevPage}
                {currentPage}
                on:selectjob={selectJob}
                on:prevschedulepage={prevSchedulePage}
                on:nextschedulepage={nextSchedulePage}
              />
            {/key}
          </div>
        {/key}
      {/if}
    </MainContainer>
  </div>
{/if}

<ScheduleInfo
  on:close={closeScheduleInfo}
  {selectedEvent}
  {selectedJobId}
  {selectedShiftIds}
  signUps={signUps[selectedJobId] || {}}
/>

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

{#if confirmArchiveStatus}
  <ConfirmationModal {send}>
    <span slot="title" class="title">Archive Event</span>
    An archived an event will no longer be available to volunteers. Please confirm.
  </ConfirmationModal>
{/if}
