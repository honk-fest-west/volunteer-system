<script lang="ts">
  import Router from 'svelte-spa-router';
  import SystemLayout from '$layouts/SystemLayout.svelte';
  import wrap from 'svelte-spa-router/wrap';
  import home from '$routes/system/home/index.svelte';

  const eventsRoute = wrap({
    asyncComponent: () => import('$routes/system/events/EventsRouter.svelte'),
  });

  const prefix = '/system';
  const routes = {
    '/': home,
    '/events': eventsRoute,
    '/events/*': eventsRoute,
  };
</script>

<SystemLayout>
  <Router {routes} {prefix} />
</SystemLayout>
