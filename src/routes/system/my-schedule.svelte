<script lang="ts">
  import { fade } from 'svelte/transition';
  import MainContainer from '$components/MainContainer.svelte';
  import Header from '$components/header/Header.svelte';
  import { useAuth } from '$machines/auth';
  import { interpret } from 'xstate';
  import { createScheduleMachine } from '$machines/schedule';
  import { setContext } from 'svelte';

  const { state } = useAuth();
  let scheduleState;

  $: if ($state.context?.user?.uid) {
    const scheduleMachine = createScheduleMachine($state.context.user);
    scheduleState = interpret(scheduleMachine).start();

    setContext('scheduleMachine', {
      state: scheduleState,
      send: scheduleState.send,
    });
  }

  $: console.log('scheduleState', $scheduleState.context.schedule);
</script>

<div in:fade={{ duration: 100 }}>
  <MainContainer>
    <div slot="header">
      <Header name="My Schedule" />
    </div>
    <div class="bg-white space-y-6 divide-y divide-gray-200" />
  </MainContainer>
</div>
