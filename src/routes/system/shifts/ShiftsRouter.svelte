<script lang="ts">
  import Router from 'svelte-spa-router';
  import index from './index.svelte';
  import show from './show.svelte';

  const prefix = '/system/shifts';
  const routes = {
    '/': index,
    '/:id': show,
  };
</script>

<Router {routes} {prefix} />
