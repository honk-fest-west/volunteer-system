<script lang="ts">
  import { createShiftMachine } from '$machines/shift/shift.machine';

  import { setContext } from 'svelte';
  import Router from 'svelte-spa-router';
  import { interpret } from 'xstate';
  import index from './index.svelte';
  import show from './show.svelte';
  import { useAuth } from '$machines/auth';

  const { state } = useAuth();
  $: if ($state.context?.user?.uid) {
    const shiftMachine = createShiftMachine($state.context.user);
    const shiftState = interpret(shiftMachine).start();

    setContext('shiftMachine', { state: shiftState, send: shiftState.send });
  }

  const prefix = '/system/shifts';
  const routes = {
    '/': index,
    '/:id': show,
  };
</script>

<Router {routes} {prefix} />
