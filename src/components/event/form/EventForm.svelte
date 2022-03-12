<script lang="ts">
  import MainContainer from '$components/MainContainer.svelte';

  import type { VEvent } from '$types';

  import EventHeader from './Header.svelte';
  import EventActions from './EventActions.svelte';
  import EventStatus from './EventStatus.svelte';
  import EventDetails from './EventDetails.svelte';
  import EventJobs from './EventJobs.svelte';
  import EventErrors from './EventErrors.svelte';
  export let selectedEvent: VEvent;
  export let send;
  export let state;
  export let error;

  function updateEvent(e) {
    if (e.target.name !== 'status') {
      send('UPDATE_EVENT');
    }
  }
</script>

<MainContainer>
  <div slot="header">
    <EventHeader {send} name={selectedEvent.name} />
  </div>
  <div slot="actions">
    <EventActions {state} {send} {selectedEvent} />
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
