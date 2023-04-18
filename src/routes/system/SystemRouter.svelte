<script lang="ts">
  import Router, { push } from 'svelte-spa-router';
  import SystemLayout from '$layouts/SystemLayout.svelte';
  import wrap from 'svelte-spa-router/wrap';
  import home from '$routes/system/home/index.svelte';
  import MyScheduleRouter from '$routes/system/my-schedule.svelte';
  import ShiftsRouter from '$routes/system/shifts/ShiftsRouter.svelte';
  import VolunteersRouter from '$routes/system/admin/volunteers/VolunteersRouter.svelte';
  import AdminQuestionsRouter from'$routes/system/admin/questions/AdminQuestionsRouter.svelte';
  import EventsRouter from '$routes/system/admin/events/EventsRouter.svelte';
  import { useAuth } from '$machines/auth';
  import { getContext, setContext } from 'svelte';
  import { createQuestionMachine } from '$machines/questionModal';
  import { interpret } from 'xstate';
  import QuestionsModal from '$components/questions/QuestionsModal.svelte';

  const { state } = useAuth();

  $: user = $state?.context?.user;

  $: if (user) {
    const questionModalMachine = createQuestionMachine(user);
    const state = interpret(questionModalMachine).start();

    setContext('questionModalMachine', { state, send: state.send });
  }

  function isLead(): boolean {
    return user.role === 'lead';
  }

  function routeLoaded(e) {
    console.log('route loaded', e.detail.location);
    const cookieLocation = (document.cookie
      .split('; ')
      .find((row) => row.startsWith('_routeLocation='))
      ?.split('=') || [])[1];

    if (cookieLocation !== e.detail.location) {
      document.cookie = `_routeLocation=${e.detail.location}`;
    }
  }

  const shiftsRoute = wrap({
    component: ShiftsRouter,
  });

  const myScheduleRoute = wrap({
    component: MyScheduleRouter,
  });

  const eventsRoute = wrap({
    component: EventsRouter,
    conditions: [() => isLead()],
  });

  const volunteersRoute = wrap({
    component: VolunteersRouter,
    conditions: [() => isLead()],
  });

  const questionsRoute = wrap({
    component: AdminQuestionsRouter,
    conditions: [() => isLead()],
  });

  const prefix = '/system';
  const routes = new Map();
  routes.set('/', home);
  routes.set(/^\/shifts.*$/, shiftsRoute);
  routes.set('/my-schedule', myScheduleRoute);
  routes.set(/^\/admin\/events.*$/, eventsRoute);
  routes.set(/^\/admin\/volunteers.*$/, volunteersRoute);
  routes.set(/^\/admin\/questions.*$/, questionsRoute);
</script>

<SystemLayout>
  <Router {routes} {prefix} on:routeLoaded={routeLoaded} />
</SystemLayout>

<QuestionsModal />
