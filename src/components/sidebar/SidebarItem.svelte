<script>
  import { location, link } from 'svelte-spa-router';
  import { useAuth } from '$machines/auth';
  export let href = '#';
  export let external = false;
  export let admin = false;

  const { state } = useAuth();
  $: pathname = $location || '/system';

  $: shouldDisplayRoute = $state.context?.user?.role === 'lead' || !admin;

  function isCurrent() {
    return (
      (href === '/system' && pathname === '/system') ||
      (href !== '/system' && pathname.startsWith(href))
    );
  }
</script>

{#if external && shouldDisplayRoute}
  <a
    {href}
    target="_blank"
    class="text-gray-400 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
  >
    <slot />
  </a>
{:else if pathname && shouldDisplayRoute && isCurrent()}
  <a
    {href}
    on:click
    class="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
    use:link
  >
    <slot />
  </a>
{:else if shouldDisplayRoute}
  <a
    {href}
    on:click
    class="text-gray-400 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
    use:link
  >
    <slot />
  </a>
{/if}
