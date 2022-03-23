<script lang="ts">
  import type { Job } from '$models';
  import { createEventDispatcher } from 'svelte';

  export let jobs: Job[] = [];

  const dispatch = createEventDispatcher();
  const numJobs = Array.from({ length: jobs.length }, (v, i) => i + 1);

  function selectJob(jobId: string) {
    console.log('selectJob', jobId);
    dispatch('selectjob', jobId);
  }
</script>

<div
  data-file="VerticalLines.svelte"
  class="variable-cols col-start-1 col-end-2 row-start-1 hidden grid-rows-1 divide-x divide-gray-100 sm:grid"
  style="--num-jobs: {numJobs}"
>
  {#each jobs as job, i}
    <button on:click={() => selectJob(job.id)}>
      <div class="row-span-full" style="grid-column-start: {i + 1};" />
    </button>
  {/each}
  <div
    class="row-span-full w-8"
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
