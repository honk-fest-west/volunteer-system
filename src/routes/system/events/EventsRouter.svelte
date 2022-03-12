<script lang="ts">
  import Router from 'svelte-spa-router';
  import index from './index.svelte';
  import edit from './edit.svelte';
  import show from './show.svelte';
  import { useEvents } from '$machines/event';
  import { setContext } from 'svelte';

  setContext('events', useEvents());

  const prefix = '/system/events';
  const routes = {
    '/': index,
    '/:id/edit': edit,
    '/:id': show,
  };
</script>

<Router {routes} {prefix} />
