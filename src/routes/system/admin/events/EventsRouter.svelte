<script lang="ts">
  import Router from 'svelte-spa-router';
  import { interpret } from 'xstate';
  import { setContext } from 'svelte';
  import index from './index.svelte';
  import event from './event.svelte';
  import { eventMachine } from '$machines/admin/events';
  import { prefix } from '$routes/prefix';

  const eventState = interpret(eventMachine).start();
  setContext('eventMachine', { state: eventState, send: eventState.send });

  const routes = {
    '/': index,
    '/:id': event,
  };
</script>

<Router {routes} prefix={prefix.admin_events_path()} />
