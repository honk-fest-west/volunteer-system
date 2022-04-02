<script lang="ts">
  import Router, { replace, push, location } from 'svelte-spa-router';
  import wrap from 'svelte-spa-router/wrap';
  import { useAuth } from '$machines/auth';
  import SystemRouter from '$routes/system/SystemRouter.svelte';

  const { state } = useAuth();

  const infoRoute = wrap({
    asyncComponent: () => import('$routes/info/InfoRouter.svelte'),
  });

  const authRoute = wrap({
    asyncComponent: () => import('$routes/auth/AuthRouter.svelte'),
  });

  // const systemRoute = wrap({
  //   asyncComponent: () => import('$routes/system/SystemRouter.svelte'),
  //   conditions: [
  //     () => {
  //       return $state.matches('signedIn');
  //     },
  //   ],
  // });

  const systemRoute = wrap({
    component: SystemRouter,
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

  $: routeLocation = $location;

  $: if (routeLocation) {
    if (routeLocation === '/system') {
      const cookieLocation = (document.cookie
        .split('; ')
        .find((row) => row.startsWith('_routeLocation='))
        ?.split('=') || [])[1];

      if (cookieLocation) {
        push(cookieLocation);
      }
    } else if (routeLocation.startsWith('/system/')) {
      document.cookie = `_routeLocation=${routeLocation}`;
    }
  }

  function notSignedIn() {
    replace('/auth');
  }
</script>

<Router {routes} on:conditionsFailed={notSignedIn} />
