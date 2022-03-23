<script lang="ts">
  import type { Shift } from '$types';
  import { shortTime } from '$util';
  import { createEventDispatcher } from 'svelte';
  import { Square } from 'svelte-loading-spinners';

  export let selectableShift: {
    shift: Shift;
    signUpId: string;
    comment: string;
    checked: boolean;
  };
  export let disabled = true;
  export let eventLocation;

  $: shift = selectableShift.shift;
  $: signUpId = selectableShift.signUpId;
  $: comment = selectableShift.comment;
  $: checked = selectableShift.checked;

  const dispatch = createEventDispatcher();
  let focused = false;

  function handleChange() {
    focused = true;
    if (signUpId) {
      dispatch('unsignUp', { shiftId: shift.id, signUpId });
    } else {
      dispatch('signUp', { shiftId: shift.id });
    }
  }

  function handleComment(e) {
    dispatch('comment', { signUpId, comment: e.target.value });
  }
</script>

{#if shift}
  <div class="relative flex items-start py-4">
    <div class="flex items-center h-5">
      {#if focused && disabled}
        <div on:mouseleave={() => (focused = false)}>
          <Square size="16" color="#4338CA" />
        </div>
      {:else}
        <input
          id={`shift-checkbox-${shift.id}`}
          aria-describedby={`${shortTime(shift.from)} to ${shortTime(
            shift.to
          )}`}
          name={`shift-checkbox-${shift.id}`}
          type="checkbox"
          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          bind:checked
          on:click={handleChange}
          on:mouseleave={() => (focused = false)}
          {disabled}
        />
      {/if}
    </div>
    <div class="ml-3 min-w-0 flex-1 text-sm flex flex-col">
      <label for="candidates" class="font-medium text-gray-700"
        >{shortTime(shift.from)} to {shortTime(shift.to)}</label
      >
      <p class="text-gray-500">
        {shift.location || eventLocation}
      </p>
      {#if checked}
        <div class="mt-2 flex-grow">
          <textarea
            class="h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 text-gray-700 rounded-md"
            id={`shift-comment-${shift.id}`}
            name={`shift-comment-${shift.id}`}
            placeholder="Add a comment"
            value={comment}
            on:input={handleComment}
          />
        </div>
      {/if}
    </div>
  </div>
{/if}
