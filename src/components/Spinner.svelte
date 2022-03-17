<script lang="ts">
  import { fade } from 'svelte/transition';
  import { getContext } from 'svelte';
  export let show = false;
  const { state } = getContext('auth');
  $: show = [
    'authenticating',
    'loadingUser',
    'loadingProfile',
    'updatingProfile',
    'signingOut',
    'signingIn',
    'signingUp',
    'deletingAccount',
  ].some($state.matches);
</script>

{#if show}
  <div
    class="fixed z-10 inset-0 overflow-y-auto flex flex-col items-center justify-center bg-opacity-50 bg-gray-700"
    out:fade
  >
    <h2 class="text-white font-bold text-center text-4xl mb-6">Loading</h2>
    <svg
      class="animate-spin h-20 w-20 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </div>
{/if}
