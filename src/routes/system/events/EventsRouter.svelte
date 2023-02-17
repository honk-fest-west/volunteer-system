<script lang="ts">
  import Router from 'svelte-spa-router';
  import { interpret } from 'xstate';
  import { setContext } from 'svelte';
  import index from './index.svelte';
  import event from './event.svelte';
  import { eventMachine } from '$machines/admin/events';

  const eventState = interpret(eventMachine).start();
  setContext('eventMachine', { state: eventState, send: eventState.send });

  const prefix = '/system/events';
  const routes = {
    '/': index,
    '/:id': event,
  };
</script>

<Router {routes} {prefix} />
