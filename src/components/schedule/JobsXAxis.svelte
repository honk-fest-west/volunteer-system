<script lang="ts">
  import type { Job } from '$models';
  import { createEventDispatcher } from 'svelte';

  export let jobs: Job[];
  export let allowPrevPage: boolean;
  export let allowNextPage: boolean;

  $: numJobs = jobs.length;

  const dispatch = createEventDispatcher();

  function prevPage() {
    dispatch('prevschedulepage');
  }

  function nextPage() {
    dispatch('nextschedulepage');
  }
</script>

<div
  class="variable-cols -mr-px hidden divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid"
  style="--num-jobs: {numJobs}"
>
  <div class="col-end-1 w-14 flex items-center justify-center">
    {#if allowPrevPage}
      <button
        on:click={prevPage}
        class="rounded-full text-indigo-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
          />
        </svg></button
      >
    {/if}
  </div>
  {#each jobs as job}
    <div
      class="flex items-center justify-center py-3 opacity-80"
      style="background-color: {job.color}"
    >
      <span
        class="items-center justify-center font-semibold text-white text-center"
        >{job.name}</span
      >
    </div>
  {/each}
  <div
    class="w-14 flex items-center justify-center"
    style="grid-column-end: {numJobs + 2}"
  >
    {#if allowNextPage}
      <button
        on:click={nextPage}
        class="rounded-full text-indigo-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg></button
      >
    {/if}
  </div>
</div>

<style>
  .variable-cols {
    grid-template-columns: repeat(var(--num-jobs), minmax(0, 1fr));
  }
</style>
