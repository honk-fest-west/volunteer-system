<script lang="ts">
  import Router from 'svelte-spa-router';
  import { interpret } from 'xstate';
  import { setContext } from 'svelte';
  import index from './index.svelte';
  import { volunteerMachine } from '$machines/admin/volunteers';
  import { prefix } from '$routes/prefix';

  const volunteerState = interpret(volunteerMachine).start();
  setContext('volunteerMachine', {
    state: volunteerState,
    send: volunteerState.send,
  });

  const routes = {
    '/': index,
  };
</script>

<Router {routes} prefix={prefix.admin_volunteers_path()} />
