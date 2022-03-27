<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Job } from '$models';
  export let job: Job;
  export let shiftsSignedUpCount: number;

  const dispatch = createEventDispatcher();

  function selectJob() {
    dispatch('selectJobId', job.id);
  }

  function shiftCount(text = 'Job') {
    if (shiftsSignedUpCount > 1) {
      return `${shiftsSignedUpCount} Shifts`;
    } else if (shiftsSignedUpCount === 1) {
      return `${shiftsSignedUpCount} Shift`;
    } else {
      return text;
    }
  }
</script>

<div class="flex-col shadow-sm rounded-md h-full hidden sm:flex">
  <div
    class="h-10 flex-shrink-0 flex text-center items-center justify-center w-full text-white text-sm font-medium rounded-t-md"
    style="background-color: {job.color};"
  >
    {job.name}
  </div>
  <div
    class="flex-1 flex flex-col items-center justify-between border-l border-r border-b border-gray-200 bg-white rounded-r-md "
  >
    <div class="flex-1 px-4 py-2 text-sm">
      {#if job.description}
        <p class="text-gray-900 font-medium hover:text-gray-600 ">
          {job.description}
        </p>
      {/if}
    </div>
    <div class="flex-shrink-0 pb-2">
      <button
        type="button"
        on:click={selectJob}
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white opacity-70  hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        style="background-color: {job.color};"
      >
        <span class:font-bold={shiftsSignedUpCount}>{shiftCount()}</span>
      </button>
    </div>
  </div>
</div>

<!-- MOBILE BUTTON -->
<div class="flex-col shadow-sm rounded-md h-full flex sm:hidden">
  <button
    type="button"
    on:click={selectJob}
    class="flex w-full justify-between shadow-md items-center px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white opacity-70  hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    style="background-color: {job.color};"
  >
    <span class:hidden={!shiftsSignedUpCount} class="text-left"
      >{shiftsSignedUpCount}</span
    >
    <span class="text-right flex-grow">{job.name}</span>
  </button>
</div>
