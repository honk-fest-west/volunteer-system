<script>
  import { useAuth } from '$machines/auth';
  export let href = '#';
  export let external = false;
  export let admin = false;

  const { state } = useAuth();

  $: shouldDisplay = $state.context?.user?.role === 'lead' || !admin;
</script>

{#if shouldDisplay}
  <div class="px-3">
    <h2
      class="mt-8 mb-2 pb-4 border-b border-gray-600 text-xs font-semibold text-gray-300 uppercase tracking-wider text-right"
    >
      <slot />
    </h2>
  </div>
{/if}
