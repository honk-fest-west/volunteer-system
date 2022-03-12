<script lang="ts">
  import InfoLayout from '$layouts/InfoLayout.svelte';
  import Router from 'svelte-spa-router';
  import privacy from '$routes/info/privacy-policy.svelte';
  import dataDelete from '$routes/info/data-deletion-instructions.svelte';

  const prefix = '/info';
  const routes = {
    '/privacy-policy': privacy,
    '/data-deletion-instructions': dataDelete,
  };
</script>

<InfoLayout>
  <Router {routes} {prefix} />
</InfoLayout>
