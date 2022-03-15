<script lang="ts">
  export let active = false;
  export let disabled = false;
</script>

{#if active}
  <button class="rounded ring-2 ring-indigo-200 p-2" disabled>
    <p class="text-lg font-semibold text-indigo-700">
      <slot name="name" />
    </p>
    <p class="text-sm text-indigo-500 hidden sm:block">
      <slot name="description" />
    </p>
  </button>
{:else if disabled}
  <button class="rounded bg-gray-100 p-2" disabled>
    <p class="text-lg font-semibold text-gray-400">
      <slot name="name" />
    </p>
    <p class="text-sm text-gray-400 hidden sm:block">
      <slot name="description" />
    </p>
  </button>
{:else}
  <button class="rounded p-2 hover:ring-2 hover:ring-gray-200" on:click>
    <p class="text-lg font-semibold text-gray-700">
      <slot name="name" />
    </p>
    <p class="text-sm text-gray-500 hidden sm:block">
      <slot name="description" />
    </p>
  </button>
{/if}
