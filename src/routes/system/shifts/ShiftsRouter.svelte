<script lang="ts">
  import { machine } from '$machines/shift/shift.machine';

  import { setContext } from 'svelte';
  import Router from 'svelte-spa-router';
  import wrap from 'svelte-spa-router/wrap';
  import { interpret } from 'xstate';
  import index from './index.svelte';
  import show from './show.svelte';

  const state = interpret(machine).start();
  const send = state.send;

  setContext('shiftMachine', { state, send });

  const prefix = '/system/shifts';
  const routes = {
    '/': index,
    '/:id': show,
  };
</script>

<Router {routes} {prefix} />
