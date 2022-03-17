<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Job } from '$models';
  export let job: Job;

  const dispatch = createEventDispatcher();

  function selectJob() {
    dispatch('selectJob', job);
  }
</script>

<div class="flex flex-col shadow-sm rounded-md h-full">
  <div
    class="h-10 flex-shrink-0 flex items-center justify-center w-full text-white text-sm font-medium rounded-t-md"
    style="background-color: {job.color};"
  >
    {job.name}
  </div>
  <div
    class="flex-1 flex flex-col items-center justify-between border-l border-r border-b border-gray-200 bg-white rounded-r-md "
  >
    <div class="flex-1 px-4 py-2 text-sm ">
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
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {job.filledShifts}/{job.totalShifts} Shifts
      </button>
    </div>
  </div>
</div>
