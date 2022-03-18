<script lang="ts">
  import Router from 'svelte-spa-router';
  import SystemLayout from '$layouts/SystemLayout.svelte';
  import wrap from 'svelte-spa-router/wrap';
  import home from '$routes/system/home/index.svelte';
  import EventsRouter from '$routes/system/events/EventsRouter.svelte';
  import ShiftsRouter from '$routes/system/shifts/ShiftsRouter.svelte';

  // const eventsRoute = wrap({
  //   asyncComponent: () => import('$routes/system/events/EventsRouter.svelte'),
  // });
  const eventsRoute = wrap({
    component: EventsRouter,
  });

  const shiftsRoute = wrap({
    component: ShiftsRouter,
  });

  const prefix = '/system';
  const routes = new Map();
  routes.set('/', home);
  routes.set(/^\/events.*$/, eventsRoute);
  routes.set(/^\/shifts.*$/, shiftsRoute);
</script>

<SystemLayout>
  <Router {routes} {prefix} />
</SystemLayout>
