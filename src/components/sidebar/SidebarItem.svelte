<script>
  import { location, link } from 'svelte-spa-router';
  import { useAuth } from '$machines/auth';
  export let href = '#';

  const { state } = useAuth();
  $: pathname = $location || '/system';

  $: shouldDisplayRoute =
    $state.context?.user?.role === 'lead' ||
    href === '/system' ||
    href.startsWith('/system/shifts') ||
    href.startsWith('/system/documents');

  function isCurrent() {
    return (
      (href === '/system' && pathname === '/system') ||
      (href !== '/system' && pathname.startsWith(href))
    );
  }
</script>

{#if pathname && shouldDisplayRoute && isCurrent()}
  <a
    {href}
    class="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
    use:link
  >
    <slot />
  </a>
{:else if shouldDisplayRoute}
  <a
    {href}
    class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
    use:link
  >
    <slot />
  </a>
{/if}
