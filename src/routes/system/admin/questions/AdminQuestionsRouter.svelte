<script lang="ts">
  import Router from 'svelte-spa-router';
  import { interpret } from 'xstate';
  import { setContext } from 'svelte';
  import index from './index.svelte';
  import question from './question.svelte';
  import { questionMachine } from '$machines/admin/questions';
  import { prefix } from '$routes/prefix'; 

  const state = interpret(questionMachine).start();
  setContext('questionMachine', { state, send: state.send });

  console.log('prefix.admin_questions_path()', prefix.admin_questions_path());

  const routes = {
    '/': index,
    '/:id': question,
  };
</script>

<Router {routes} prefix={prefix.admin_questions_path()} />
