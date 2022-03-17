<script lang="ts">
  import { fade } from 'svelte/transition';
  import { getContext, onMount } from 'svelte';
  import MainContainer from '$components/MainContainer.svelte';
  import Header from '$components/event/Header.svelte';
  import Errors from '$components/event/Errors.svelte';
  import Details from '$components/event/Details.svelte';
  import Jobs from '$components/event/jobs/Jobs.svelte';

  export let params: { id?: string } = {};

  // export let state;
  // export let send;

  const { state, send } = getContext('shiftMachine');
  $: selectedEvent = $state.context?.selectedEvent;
  $: error = $state.context?.error;

  onMount(() => send('SHOW.AT', { data: params.id }));

  function gotoIndex() {
    send('SHOW.GOTO_INDEX');
  }

  function showJobShifts(e) {
    // TODO: show job shifts
  }
</script>

{#if selectedEvent}
  <div in:fade={{ duration: 100 }}>
    <MainContainer>
      <div slot="header">
        <Header on:goBack={gotoIndex} name={selectedEvent.name} />
      </div>
      <div class="bg-white space-y-6 divide-y divide-gray-200">
        <Errors {error} />
        <Details {selectedEvent} />
        <Jobs {selectedEvent} on:selectJob={showJobShifts} />
      </div>
    </MainContainer>
  </div>
{/if}
