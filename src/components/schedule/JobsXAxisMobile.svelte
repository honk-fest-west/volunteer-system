<script lang="ts">
  import type { Job } from '$models';

  export let jobs: Job[];

  $: numJobs = jobs.length;

  function firstLetters(name: string): string {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();
  }
</script>

<div
  class="variable-cols grid text-sm leading-6 text-gray-500 sm:hidden"
  style="--num-jobs: {numJobs}"
>
  {#each jobs as job}
    <button type="button" class="flex flex-col items-center pt-2 pb-3"
      ><span
        class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900"
        >{firstLetters(job.name)}</span
      ></button
    >
  {/each}
</div>

<style>
  .variable-cols {
    grid-template-columns: repeat(var(--num-jobs), minmax(0, 1fr));
  }
</style>
