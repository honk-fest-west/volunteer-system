<script lang="ts">
  import { setContext } from 'svelte';
  import { useAuth } from '$machines/auth';
  import AuthLayout from '$layouts/AuthLayout.svelte';
  import Router from 'svelte-spa-router';
  import index from './index.svelte';
  import required from './required.svelte';

  const { state, send } = useAuth();
  setContext('auth', { state, send });

  $: error = $state.context?.error;

  const prefix = '/auth';
  const routes = {
    '/required': required,
    '/': index,
  };
</script>

<AuthLayout {error}>
  <Router {routes} {prefix} />
</AuthLayout>
