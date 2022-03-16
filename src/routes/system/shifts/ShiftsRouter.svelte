<script lang="ts">
  import { useShiftMachine } from '$machines/shift';

  import { setContext } from 'svelte';
  import Router from 'svelte-spa-router';
  import index from './index.svelte';
  import show from './show.svelte';

  const prefix = '/system/shifts';
  const routes = {
    '/': index,
    '/:id': show,
  };

  setContext('shiftMachine', useShiftMachine());
</script>

<Router {routes} {prefix} />
