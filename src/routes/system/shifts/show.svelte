<script lang="ts">
  import { fade } from 'svelte/transition';
  import { getContext, onMount } from 'svelte';
  import MainContainer from '$components/MainContainer.svelte';
  import Header from '$components/header/Header.svelte';
  import Errors from '$components/event/Errors.svelte';
  import Details from '$components/event/Details.svelte';
  import Jobs from '$components/shift/jobs/Jobs.svelte';
  import ShiftPicker from '$components/shift/picker/ShiftPicker.svelte';
  import BackButton from '$components/header/BackButton.svelte';

  export let params: { id?: string } = {};

  const { state, send } = getContext('shiftMachine');
  $: selectedEvent = $state.context?.selectedEvent;
  $: error = $state.context?.error;
  $: selectedJobId = $state.context?.selectedJobId;
  $: signUps = $state.context?.signUps;
  $: disableShiftPicker = [
    'show.signingUp',
    'show.unsigningUp',
    'show.updateEvent',
  ].some($state.matches);

  onMount(() => send('SHOW.AT', { data: params.id }));

  function gotoIndex() {
    send('SHOW.GOTO_INDEX');
  }

  function showJobShifts(e) {
    send('SHOW.SELECT_JOB', { data: e.detail });
  }

  function closeJobShifts() {
    send('SHOW.CLEAR_SELECTED_JOB');
  }

  function signUp(e) {
    send('SHOW.SIGN_UP', { data: e.detail });
  }

  function unsignUp(e) {
    send('SHOW.UNSIGN_UP', { data: e.detail });
  }

  function comment(e) {
    send('SIGN_UP.COMMENT', { data: e.detail });
  }
</script>

{#if selectedEvent}
  <div in:fade={{ duration: 100 }}>
    <MainContainer>
      <div slot="header">
        <Header name="Select a Job >>">
          <BackButton slot="left" on:goBack={gotoIndex} />
        </Header>
      </div>
      <div class="bg-white space-y-6 divide-y divide-gray-200">
        <Errors {error} />
        <Details {...selectedEvent} />
        {#key signUps}
          <Jobs {selectedEvent} {signUps} on:selectJobId={showJobShifts} />
        {/key}
      </div>
    </MainContainer>
  </div>
{/if}

<ShiftPicker
  on:signUp={signUp}
  on:unsignUp={unsignUp}
  on:comment={comment}
  on:close={closeJobShifts}
  disabled={disableShiftPicker}
  {selectedEvent}
  {selectedJobId}
  {signUps}
/>
