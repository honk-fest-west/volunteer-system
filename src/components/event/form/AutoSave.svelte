<script>
  export let autoSave;
</script>

{#key $autoSave}
  <div class="text-gray-400 font-semibold text-md flex items-center">
    {#if $autoSave.value === 'waitingChanges'}
      <p>Saved</p>
    {:else if autoSave && ['debouncing', 'saving'].some($autoSave.matches)}
      <p class="mr-2">Saving</p>
      <svg
        class="animate-spin h-6 w-6"
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
    {/if}
  </div>
{/key}
