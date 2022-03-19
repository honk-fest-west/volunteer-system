<script lang="ts">
  import type { Shift } from '$types';
  import { shortTime } from '$util';
  import { createEventDispatcher } from 'svelte';
  import { Square } from 'svelte-loading-spinners';

  export let selectableShift: {
    shift: Shift;
    signUpId: string;
    checked: boolean;
  };
  export let disabled = true;

  const dispatch = createEventDispatcher();
  $: shift = selectableShift.shift;
  $: signUpId = selectableShift.signUpId;
  $: checked = selectableShift.checked;

  function handleChange() {
    if (signUpId) {
      dispatch('unsignUp', { shiftId: shift.id, signUpId: signUpId });
    } else {
      dispatch('signUp', { shiftId: shift.id });
    }
  }
</script>

{#if shift}
  <div class="relative flex items-start py-4">
    <div class="flex items-center h-5">
      {#if disabled}
        <Square size="16" color="#4338CA" />
      {:else}
        <input
          id="candidates"
          aria-describedby="candidates-description"
          name="candidates"
          type="checkbox"
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          bind:checked
          on:click={handleChange}
          {disabled}
        />
      {/if}
    </div>
    <div class="ml-3 min-w-0 flex-1 text-sm">
      <label for="candidates" class="font-medium text-gray-700"
        >{shortTime(shift.from)} to {shortTime(shift.to)}</label
      >
      <p id="candidates-description" class="text-gray-500">
        {shift.location}
      </p>
    </div>
  </div>
{/if}
