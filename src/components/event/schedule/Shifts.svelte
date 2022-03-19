<script lang="ts">
  import type { Job } from '$models';
  import type { JobSignUpCollection } from '$types';
  import JobColumn from './JobColumn.svelte';

  export let date: string;
  export let jobs: Job[] = [];
  export let signUps: JobSignUpCollection = {};
  $: numJobs = jobs.length;
</script>

{#if signUps}
  <ol
    class="variable-cols col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:pr-8"
    style="--num-jobs: {numJobs}; grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto"
  >
    {#each jobs as job, i}
      <JobColumn {date} {job} col={i + 1} jobSignUps={signUps[job.id] || {}} />
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
