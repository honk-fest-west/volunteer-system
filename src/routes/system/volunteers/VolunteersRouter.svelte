<script lang="ts">
  import Router from 'svelte-spa-router';
  import { interpret } from 'xstate';
  import { setContext } from 'svelte';
  import index from './index.svelte';
  // import event from './event.svelte';
  import { volunteerMachine } from '$machines/admin/volunteers';

  const volunteerState = interpret(volunteerMachine).start();
  setContext('volunteerMachine', {
    state: volunteerState,
    send: volunteerState.send,
  });

  const prefix = '/system/volunteers';
  const routes = {
    '/': index,
  };
</script>

<Router {routes} {prefix} />
