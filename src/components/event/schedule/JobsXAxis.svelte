<script lang="ts">
  import type { Job } from '$models';

  export let jobs: Job[];
  $: numJobs = jobs.length;
</script>

<div
  class="variable-cols -mr-px hidden divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid"
  style="--num-jobs: {numJobs}"
>
  <div class="col-end-1 w-14" />
  {#each jobs as job}
    <div class="flex items-center justify-center py-3">
      <span class="items-center justify-center font-semibold text-gray-900"
        >{job.name}</span
      >
    </div>
  {/each}
</div>

<style>
  .variable-cols {
    grid-template-columns: repeat(var(--num-jobs), minmax(0, 1fr));
  }
</style>
