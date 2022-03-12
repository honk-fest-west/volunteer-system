<script>
  import { location, link } from 'svelte-spa-router';
  export let href = '#';

  $: pathname = $location || '/system';

  function isCurrent() {
    return (
      (href === '/system' && pathname === '/system') ||
      (href !== '/system' && pathname.startsWith(href))
    );
  }
</script>

{#if pathname && isCurrent()}
  <a
    {href}
    class="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
    use:link
  >
    <slot />
  </a>
{:else}
  <a
    {href}
    class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
    use:link
  >
    <slot />
  </a>
{/if}
