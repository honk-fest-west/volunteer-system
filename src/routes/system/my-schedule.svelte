<script lang="ts">
  import { fade } from 'svelte/transition';
  import MainContainer from '$components/MainContainer.svelte';
  import Header from '$components/header/Header.svelte';
  import { useAuth } from '$machines/auth';
  import { interpret } from 'xstate';
  import { createScheduleMachine } from '$machines/schedule';
  import { setContext } from 'svelte';
  import MySchedule from '$components/my/schedule/MySchedule.svelte';

  const { state } = useAuth();

  $: if ($state.context?.user?.uid) {
    const scheduleMachine = createScheduleMachine($state.context.user);
    const scheduleState = interpret(scheduleMachine).start();

    setContext('scheduleMachine', {
      state: scheduleState,
      send: scheduleState.send,
    });
  }
</script>

<div in:fade={{ duration: 100 }}>
  <MainContainer>
    <div slot="header">
      <Header name="My Schedule" />
    </div>
    <div class="bg-white space-y-6 divide-y divide-gray-200" />
    <MySchedule />
  </MainContainer>
</div>
