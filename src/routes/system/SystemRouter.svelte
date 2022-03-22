<script lang="ts">
  import Router from 'svelte-spa-router';
  import SystemLayout from '$layouts/SystemLayout.svelte';
  import wrap from 'svelte-spa-router/wrap';
  import home from '$routes/system/home/index.svelte';
  import MyScheduleRouter from '$routes/system/my-schedule.svelte';
  import EventsRouter from '$routes/system/events/EventsRouter.svelte';
  import ShiftsRouter from '$routes/system/shifts/ShiftsRouter.svelte';
  import VolunteersRouter from '$routes/system/volunteers/VolunteersRouter.svelte';
  import { useAuth } from '$machines/auth';
  import { setContext } from 'svelte';

  const { state } = useAuth();
  // const eventsRoute = wrap({
  //   asyncComponent: () => import('$routes/system/events/EventsRouter.svelte'),
  // });

  function isLead(): boolean {
    return $state.context.user.role === 'lead';
  }

  const eventsRoute = wrap({
    component: EventsRouter,
    conditions: [() => isLead()],
  });

  const shiftsRoute = wrap({
    component: ShiftsRouter,
  });

  const myScheduleRoute = wrap({
    component: MyScheduleRouter,
  });

  const volunteersRoute = wrap({
    component: VolunteersRouter,
  });

  const prefix = '/system';
  const routes = new Map();
  routes.set('/', home);
  routes.set(/^\/events.*$/, eventsRoute);
  routes.set(/^\/shifts.*$/, shiftsRoute);
  routes.set(/^\/volunteers.*$/, volunteersRoute);
  routes.set('/my-schedule', myScheduleRoute);
</script>

<SystemLayout>
  <Router {routes} {prefix} />
</SystemLayout>
