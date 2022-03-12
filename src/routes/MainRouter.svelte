<script lang="ts">
  import Router, { replace } from 'svelte-spa-router';
  import wrap from 'svelte-spa-router/wrap';
  import { useAuth } from '$machines/auth';

  const { state } = useAuth();

  const infoRoute = wrap({
    asyncComponent: () => import('$routes/info/InfoRouter.svelte'),
  });

  const authRoute = wrap({
    asyncComponent: () => import('$routes/auth/AuthRouter.svelte'),
  });

  const systemRoute = wrap({
    asyncComponent: () => import('$routes/system/SystemRouter.svelte'),
    conditions: [
      () => {
        return $state.matches('signedIn');
      },
    ],
  });

  const routes = {
    '/system': systemRoute,
    '/system/*': systemRoute,
    '/auth': authRoute,
    '/auth/*': authRoute,
    '/info/*': infoRoute,
    '*': authRoute,
  };

  function notSignedIn() {
    replace('/auth');
  }
</script>

<Router {routes} on:conditionsFailed={notSignedIn} />
