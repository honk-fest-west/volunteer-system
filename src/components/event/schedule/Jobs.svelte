<script lang="ts">
  import type { Job } from '$models';
  import type { JobSignUpCollection } from '$types';

  import { hoursToMilliseconds } from '$util';
  import JobColumn from './JobColumn.svelte';

  export let date: string;
  export let jobs: Job[] = [];
  export let signUps: JobSignUpCollection = {};
  export let startTime: number;
  export let endTime: number;
  export let mobileJob: number;

  const numRows = ((endTime - startTime) * 12) / hoursToMilliseconds();

  $: numJobs = jobs.length;
</script>

{#if signUps}
  <ol
    class="variable-cols col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:pr-14"
    style="--num-jobs: {numJobs}; grid-template-rows: 1.75rem repeat({numRows}, minmax(0, 1fr)) auto"
  >
    {#each jobs as job, i}
      <JobColumn
        {date}
        {job}
        {startTime}
        {mobileJob}
        col={i + 1}
        jobSignUps={signUps[job.id] || {}}
        on:selectjob
      />
    {/each}
  </ol>
{/if}

<style>
  @media (min-width: 640px) {
    .variable-cols {
      grid-template-columns: repeat(var(--num-jobs), minmax(0, 1fr));
    }
  }
</style>
