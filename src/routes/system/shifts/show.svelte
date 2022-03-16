<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { useShowEvent } from '$machines/event';
  import MainContainer from '$components/MainContainer.svelte';
  import Header from '$components/event/Header.svelte';
  import Errors from '$components/event/Errors.svelte';
  import Details from '$components/event/Details.svelte';
  import Jobs from '$components/event/jobs/Jobs.svelte';

  export let params: { id?: string } = {};

  const { state, send } = useShowEvent();

  $: selectedEvent = $state.context.selectedEvent;
  $: signUps = $state.context.signUps;
  $: error = $state.context.error;

  onMount(() => send('SHOW_EVENT', { data: { eventId: params.id } }));

  function gotoIndex() {
    send('GOTO_INDEX');
  }

  function showJobShifts(e) {
    send('SHOW_JOB_SHIFTS', { data: e.detail });
  }
</script>

{#if selectedEvent && signUps}
  <div in:fade={{ duration: 100 }}>
    <MainContainer>
      <div slot="header">
        <Header on:goBack={gotoIndex} name={selectedEvent.name} />
      </div>
      <div class="bg-white space-y-6 divide-y divide-gray-200">
        <Errors {error} />
        <Details {selectedEvent} />
        <Jobs {selectedEvent} {signUps} on:selectJob={showJobShifts} />
      </div>
    </MainContainer>
  </div>
{/if}
