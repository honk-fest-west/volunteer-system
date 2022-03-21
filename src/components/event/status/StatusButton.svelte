<script lang="ts">
  import { scale } from 'svelte/transition';

  export let active = false;
  export let disabled = false;
</script>

{#if active}
  <button
    class="rounded ring-2 ring-gray-300 p-2 flex flex-col items-center "
    disabled
  >
    <p class="text-lg font-semibold text-gray-700">
      <slot name="name" />
    </p>
    <p class="text-sm text-gray-500 hidden lg:block">
      <slot name="description" />
    </p>
  </button>
{:else if disabled}
  <button class="rounded bg-gray-100 p-2 flex flex-col items-center" disabled>
    <p class="text-lg font-semibold text-gray-400">
      <slot name="name" />
    </p>
    <p class="text-sm text-gray-400 hidden lg:block">
      <slot name="description" />
    </p>
  </button>
{:else}
  <button
    class="rounded p-2 opacity-70 hover:opacity-100 hover:ring-2 hover:ring-indigo-200 flex flex-col items-center"
    on:click
  >
    <p class="text-lg font-semibold text-indigo-700">
      <slot name="name" />
    </p>
    <p class="text-sm text-indigo-500 hidden lg:block">
      <slot name="description" />
    </p>
  </button>
{/if}
