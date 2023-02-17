<script lang="ts">
  import Router from 'svelte-spa-router';
  import { interpret } from 'xstate';
  import { setContext } from 'svelte';
  import index from './index.svelte';
  import question from './question.svelte';
  import { questionMachine } from '$machines/admin/questions';

  const state = interpret(questionMachine).start();
  setContext('questionMachine', { state, send: state.send });

  const prefix = '/system/questions';
  const routes = {
    '/': index,
    '/:id': question,
  };
</script>

<Router {routes} {prefix} />
