<script lang="ts">
  import type { Job } from '$models';
  import { createEventDispatcher } from 'svelte';

  export let jobs: Job[] = [];

  const dispatch = createEventDispatcher();

  function selectJob(jobId: string) {
    dispatch('selectjob', jobId);
  }
</script>

<div
  data-file="VerticalLines.svelte"
  class="variable-cols col-start-1 col-end-2 row-start-1 hidden grid-rows-1 divide-x divide-gray-100 sm:grid"
  style="--num-jobs: {jobs.length}"
>
  {#each jobs as job, i}
    <button
      class="hover:bg-opacity-10 hover:bg-indigo-200"
      on:click={() => selectJob(job.id)}
    >
      <div class="row-span-full" style="grid-column-start: {i + 1};" />
    </button>
  {/each}
  <div
    class="row-span-full w-14"
    style="grid-column-start: {jobs.length + 1};"
  />
</div>

<style>
  .variable-cols {
    grid-template-columns: repeat(var(--num-jobs), minmax(0, 1fr));
  }
  @media (min-width: 640px) {
    .variable-cols {
      grid-template-columns: repeat(var(--num-jobs), minmax(0, 1fr));
    }
  }
</style>
